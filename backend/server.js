import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import emailConfig from "./email.config.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Mock email service for development
const mockEmailService = {
  async sendMail(options) {
    console.log('\n--- Email would be sent ---');
    console.log('To:', options.to);
    console.log('Subject:', options.subject);
    console.log('Content:', options.html);
    console.log('------------------------\n');
    return true;
  }
};

// Initialize data stores
const users = [];
const verificationTokens = new Map();

app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, email, password, phone, dateOfBirth } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required" });
    }
    
    if (users.some(u => u.username === username || u.email === email)) {
      return res.status(409).json({ message: "Username or email already exists" });
    }
    
    const newUser = {
      id: uuidv4(),
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password,
      phone: phone?.trim() || "",
      dateOfBirth: dateOfBirth || new Date().toISOString(),
      role: "user",
      verified: false // Set to false until email is verified
    };
    
    // Generate verification token
    const verificationToken = uuidv4();
    verificationTokens.set(verificationToken, newUser.id);

    try {
      if (!transporter) {
        throw new Error("Email transport not configured");
      }

      // Send verification email
      await transporter.sendMail({
        from: emailConfig.auth.user,
        to: newUser.email,
        subject: "Verify your Calico & Co_ account",
        html: `
          <h1>Welcome to Calico & Co_!</h1>
          <p>Thank you for registering. Please click the link below to verify your email address:</p>
          <a href="http://localhost:3000/verify-email?token=${verificationToken}">
            Verify Email
          </a>
          <p>This link will expire in 24 hours.</p>
        `
      });
      
      users.push(newUser);
      console.log("User registered successfully:", newUser);
      res.status(201).json({ 
        message: "Registration successful! Please check your email to verify your account.",
        user: { ...newUser, password: undefined }
      });
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      res.status(500).json({ message: "Registration successful but failed to send verification email. Please try logging in and requesting a new verification email." });
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "An unexpected error occurred during registration" });
  }
});

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    const { password: _, ...userData } = user;
    res.json({
      token: "mock-jwt-token",
      user: userData
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Email verification endpoint
app.post("/api/auth/verify-email", (req, res) => {
  const { token } = req.body;
  const userId = verificationTokens.get(token);

  if (!userId) {
    return res.status(400).json({ message: "Invalid or expired verification token" });
  }

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.verified = true;
  verificationTokens.delete(token);
  res.json({ message: "Email verified successfully" });
});

// Resend verification email endpoint
app.post("/api/auth/resend-verification", async (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email && !u.verified);

  if (!user) {
    return res.status(404).json({ message: "User not found or already verified" });
  }

  const verificationToken = uuidv4();
  verificationTokens.set(verificationToken, user.id);

  try {
    await transporter.sendMail({
      from: emailConfig.auth.user,
      to: email,
      subject: "Verify your Calico & Co_ account",
      html: `
        <h1>Welcome to Calico & Co_!</h1>
        <p>Please click the link below to verify your email address:</p>
        <a href="http://localhost:3000/verify-email?token=${verificationToken}">
          Verify Email
        </a>
        <p>This link will expire in 24 hours.</p>
      `
    });

    res.json({ message: "Verification email sent successfully" });
  } catch (error) {
    console.error("Failed to send verification email:", error);
    res.status(500).json({ message: "Failed to send verification email" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log("Email configuration:", emailConfig.auth.user);
});
