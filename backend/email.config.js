// For development/testing, we'll use Ethereal - a fake SMTP service
// For development, let's use SMTP4Dev - a local SMTP server
// You'll need to install and run SMTP4Dev:
// npm install -g smtp4dev
const localDevConfig = {
  host: 'localhost',
  port: 25,
  secure: false,
  ignoreTLS: true
};

export default {
  host: process.env.EMAIL_HOST || localDevConfig.host,
  port: process.env.EMAIL_PORT || localDevConfig.port,
  secure: process.env.EMAIL_SECURE === 'true' || localDevConfig.secure,
  ignoreTLS: true,
  tls: {
    rejectUnauthorized: false
  }
}
