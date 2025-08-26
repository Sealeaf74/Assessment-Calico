# Calico & Co_ - Handcrafted Yarns Store

A modern, responsive yarn store built with React, TypeScript, and TailwindCSS, featuring a comprehensive checkout system with South African courier integration.

## 🚀 Features

### Frontend
- **Modern React 18** with TypeScript
- **Responsive Design** using TailwindCSS
- **Beautiful Animations** with Framer Motion
- **UI Components** from Ant Design
- **Interactive Yarn Skeins** with realistic wool appearance
- **Shopping Cart** with full checkout process
- **Product Management** with filtering and search
- **Staff/Admin Login** for backend access

### Checkout System
- **Multi-step Checkout Process**
- **South African Courier Integration** using The Courier Guy
- **Delivery Options:**
  - Same Day Delivery (Gauteng only) - R89.99
  - Next Day Delivery - R49.99
  - Express Delivery (2-3 days) - R29.99
  - Standard Delivery (3-5 days) - R19.99
  - Economy Delivery (5-7 days) - R14.99
- **Address Collection** with South African provinces
- **VAT Calculation** (15% South African VAT)
- **Order Confirmation** with tracking details

### Backend Authentication
- **JWT-based Authentication**
- **Role-based Access Control:**
  - **Admin:** Full system access, user management
  - **Staff:** Stock updates, order management
  - **Viewer:** Read-only access
- **Secure API Endpoints** with middleware protection
- **User Management** for staff accounts

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** TailwindCSS, Ant Design
- **Animations:** Framer Motion
- **Backend:** Node.js, Express.js, SQLite3
- **Authentication:** JWT, bcrypt
- **Security:** Helmet, CORS, Rate Limiting

## 📦 Installation

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Initialize database with sample data
npm run init-db

# Start development server
npm run dev

# Start production server
npm start
```

## 🔐 Default Admin Credentials

- **Email:** `admin@calico.com`
- **Password:** `admin123`
- **Role:** Administrator

## 🚚 Courier Integration

The store integrates with **The Courier Guy** for South African deliveries:

### Delivery Zones
- **Gauteng:** All delivery options available
- **Western Cape, KwaZulu-Natal:** Next day, express, standard, economy
- **Free State, Mpumalanga:** Express, standard, economy
- **All Provinces:** Standard and economy delivery

### Shipping Costs
- **Free shipping** on orders over R200 (standard delivery)
- **Province-specific** delivery options and pricing
- **Real-time** delivery estimates based on courier selection

## 🛍️ Shopping Experience

### Product Features
- **High-quality yarn images** with realistic wool appearance
- **Detailed product information** including material, weight, and colors
- **Customer reviews** and ratings
- **Stock status** and availability
- **Color selection** with visual swatches

### Cart & Checkout
- **Persistent shopping cart** across sessions
- **Quantity management** with real-time updates
- **Delivery address collection** with validation
- **Multiple payment options** (simulated)
- **Order confirmation** with tracking information

## 🔒 Security Features

### Authentication
- **JWT tokens** for secure API access
- **Password hashing** with bcrypt
- **Session management** with localStorage
- **Role-based permissions** for different user types

### API Protection
- **Rate limiting** to prevent abuse
- **CORS configuration** for secure cross-origin requests
- **Input validation** and sanitization
- **SQL injection protection** with parameterized queries

## 📱 Responsive Design

- **Mobile-first** approach
- **Touch-friendly** interface
- **Adaptive layouts** for all screen sizes
- **Progressive enhancement** for older browsers

## 🎨 Customization

### Styling
- **TailwindCSS** utility classes for rapid development
- **CSS custom properties** for consistent theming
- **Component-based** design system
- **Dark mode** ready (can be easily implemented)

### Components
- **Reusable UI components** from Ant Design
- **Custom animations** with Framer Motion
- **Modular architecture** for easy maintenance
- **TypeScript interfaces** for type safety

## 🚀 Deployment

### Frontend
```bash
# Build production bundle
npm run build

# Deploy to your hosting service
# (Netlify, Vercel, AWS S3, etc.)
```

### Backend
```bash
# Set production environment variables
NODE_ENV=production
JWT_SECRET=your-secure-jwt-secret

# Start production server
npm start
```

## 📊 Database Schema

### Tables
- **users:** Staff and admin accounts
- **products:** Yarn inventory and details
- **stock_updates:** Audit trail for inventory changes
- **orders:** Customer orders and status
- **order_items:** Individual items in orders

### Relationships
- **One-to-many:** Users to stock updates
- **One-to-many:** Products to stock updates
- **One-to-many:** Orders to order items
- **Many-to-one:** Order items to products

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration (admin only)
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/change-password` - Change password

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (staff/admin)
- `PUT /api/products/:id` - Update product (staff/admin)
- `DELETE /api/products/:id` - Delete product (admin only)

### Stock Management
- `PATCH /api/products/:id/stock` - Update stock quantity
- `GET /api/products/:id/stock-history` - View stock change history

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - List orders (staff/admin)
- `PATCH /api/orders/:id/status` - Update order status

### Admin Dashboard
- `GET /api/admin/dashboard` - System statistics and overview

## 🧪 Testing

### Frontend Testing
```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e
```

### Backend Testing
```bash
# Run API tests
npm run test

# Run database tests
npm run test:db
```

## 📈 Performance

### Frontend Optimizations
- **Code splitting** with React.lazy()
- **Image optimization** and lazy loading
- **Bundle analysis** and optimization
- **Service worker** for offline support

### Backend Optimizations
- **Database indexing** for fast queries
- **Connection pooling** for database efficiency
- **Response caching** for static data
- **Compression** for API responses

## 🔄 Updates & Maintenance

### Regular Tasks
- **Security updates** for dependencies
- **Database backups** and maintenance
- **Performance monitoring** and optimization
- **User feedback** collection and implementation

### Version Control
- **Git workflow** with feature branches
- **Semantic versioning** for releases
- **Changelog** maintenance
- **Rollback procedures** for deployments

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Add tests** for new functionality
5. **Submit a pull request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues
- **Cart not updating:** Check localStorage and browser console
- **Login failing:** Verify backend is running and credentials are correct
- **Images not loading:** Check file paths and image assets
- **Styling issues:** Ensure TailwindCSS is properly configured

### Getting Help
- **Check the documentation** for detailed setup instructions
- **Review the code** for implementation examples
- **Open an issue** for bugs or feature requests
- **Contact the development team** for urgent support

## 🎯 Roadmap

### Upcoming Features
- **Payment gateway integration** (PayGate, PayFast)
- **Inventory management dashboard** for staff
- **Customer account system** with order history
- **Email notifications** for order updates
- **Advanced analytics** and reporting
- **Multi-language support** (Afrikaans, Zulu, Xhosa)

### Long-term Goals
- **Mobile app** development
- **Loyalty program** implementation
- **Wholesale customer portal**
- **International shipping** expansion
- **AI-powered** product recommendations

---

**Built with ❤️ for the South African crafting community**
