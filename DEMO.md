# 🛍️ Calico Store Checkout Demo Guide

This guide will walk you through testing the enhanced checkout system with South African courier integration.

## 🚀 Quick Start Demo

### 1. Start the Frontend
```bash
npm run dev
```
Navigate to `http://localhost:3000`

### 2. Start the Backend (Optional for Full Demo)
```bash
cd server
npm install
npm run init-db
npm run dev
```

## 🛒 Testing the Checkout Flow

### Step 1: Add Items to Cart
1. **Navigate to Shop tab**
2. **Click "Add to Cart"** on any yarn product
3. **Adjust quantity** if desired
4. **Click cart icon** in navigation to open cart

### Step 2: Review Cart
- **Verify items** are displayed correctly
- **Check pricing** in South African Rands (R)
- **Update quantities** using the number inputs
- **Remove items** if needed

### Step 3: Proceed to Checkout
1. **Click "Proceed to Checkout"**
2. **Fill in personal information:**
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Phone: `+27 82 123 4567`

### Step 4: Delivery Details
1. **Enter delivery address:**
   - Street: `123 Main Street`
   - City: `Johannesburg`
   - Province: `Gauteng`
   - Postal Code: `2000`
   - Instructions: `Leave at security desk`

### Step 5: Choose Courier Option
**Select from available delivery options:**

| Option | Price | Delivery Time | Available In |
|--------|-------|---------------|--------------|
| Same Day | R89.99 | 4-6 hours | Gauteng only |
| Next Day | R49.99 | Next business day | Gauteng, WC, KZN |
| Express | R29.99 | 2-3 business days | Gauteng, WC, KZN, FS, MP |
| Standard | R19.99 | 3-5 business days | All provinces |
| Economy | R14.99 | 5-7 business days | All provinces |

### Step 6: Review & Confirm
1. **Check order summary** with correct pricing
2. **Verify VAT calculation** (15% South African VAT)
3. **Click "Proceed to Payment"**
4. **Wait for processing** (simulated)
5. **View order confirmation**

## 🔐 Testing Admin/Staff Login

### Access Staff Login
1. **Click "Staff" button** in navigation
2. **Use demo credentials:**
   - Email: `admin@calico.com`
   - Password: `admin123`

### Test Backend Integration
1. **Ensure backend is running** on port 5000
2. **Login should succeed** and show user role
3. **Check browser console** for API calls
4. **Verify localStorage** has auth token

## 🧪 Demo Scenarios

### Scenario 1: Standard Checkout
- **Products:** 2 Merino Wool Yarns
- **Delivery:** Standard to Cape Town
- **Expected:** R49.98 + R19.99 + R10.50 VAT = R80.47

### Scenario 2: Premium Delivery
- **Products:** 1 Alpaca Yarn
- **Delivery:** Same Day to Johannesburg
- **Expected:** R34.99 + R89.99 + R18.75 VAT = R143.73

### Scenario 3: Free Shipping
- **Products:** 8 Cotton Blend Yarns
- **Delivery:** Standard to Durban
- **Expected:** R151.92 + R0.00 + R22.79 VAT = R174.71

## 🚚 Courier Integration Features

### Province-Specific Options
- **Gauteng:** All delivery options available
- **Western Cape:** Next day, express, standard, economy
- **KwaZulu-Natal:** Next day, express, standard, economy
- **Other Provinces:** Standard and economy only

### Real-time Pricing
- **Dynamic shipping costs** based on selection
- **VAT calculation** updates automatically
- **Total updates** in real-time

### Delivery Estimates
- **Business day calculation** (excludes weekends)
- **Province-specific** delivery times
- **Clear expectations** for customers

## 🔍 Testing Edge Cases

### Empty Cart
- **Try to checkout** with empty cart
- **Verify error handling** and user guidance

### Invalid Address
- **Submit form** with missing required fields
- **Check validation** messages

### Network Issues
- **Disconnect internet** during checkout
- **Verify error handling** and retry options

### Large Orders
- **Add many items** to test performance
- **Check cart responsiveness** with many items

## 📱 Mobile Testing

### Responsive Design
- **Test on mobile devices** or browser dev tools
- **Verify touch interactions** work correctly
- **Check form usability** on small screens

### Performance
- **Monitor loading times** on slower connections
- **Test animations** on mobile devices
- **Verify smooth scrolling** and interactions

## 🐛 Troubleshooting

### Common Issues

#### Cart Not Updating
- **Check browser console** for errors
- **Verify localStorage** is working
- **Clear browser cache** and try again

#### Checkout Form Issues
- **Ensure all required fields** are filled
- **Check form validation** messages
- **Verify province selection** is correct

#### Backend Connection
- **Ensure backend is running** on port 5000
- **Check CORS settings** in backend
- **Verify API endpoints** are accessible

### Debug Mode
```bash
# Enable debug logging
localStorage.setItem('debug', 'true')

# Check stored data
console.log('Cart:', localStorage.getItem('cart'))
console.log('User:', localStorage.getItem('userData'))
```

## 📊 Performance Metrics

### Expected Performance
- **Cart updates:** < 100ms
- **Form validation:** < 50ms
- **Checkout processing:** < 2s (simulated)
- **Page load:** < 1s on fast connections

### Monitoring
- **Use browser dev tools** to monitor performance
- **Check network tab** for API call timing
- **Monitor memory usage** during extended use

## 🎯 Next Steps

### After Demo
1. **Test with real backend** for full functionality
2. **Customize courier options** for your needs
3. **Integrate payment gateway** (PayGate, PayFast)
4. **Add email notifications** for order confirmations
5. **Implement inventory management** for staff

### Customization
- **Adjust delivery zones** and pricing
- **Modify VAT rates** if needed
- **Customize form fields** for your business
- **Add branding** to checkout process

---

**Happy Testing! 🎉**

For support or questions, check the main README or open an issue.
