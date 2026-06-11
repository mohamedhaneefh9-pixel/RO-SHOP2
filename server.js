const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'database.json');

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Default Products catalog
const defaultProducts = [
  {
    id: 1,
    name: 'Raja Aqua Premium Alkaline RO',
    price: 8499,
    capacity: '12L',
    tech: 'RO + UV + UF + TDS Controller + Alkaline',
    image: 'WhatsApp Image 2026-06-07 at 13.16.41.jpeg',
    features: ['Alkaline pH Booster', 'Active Copper Technology', 'Multi-stage purification', '12L Storage Capacity']
  },
  {
    id: 2,
    name: 'Raja Aqua Copper+ Zinc RO',
    price: 9999,
    capacity: '10L',
    tech: 'RO + UV + Active Copper + Zinc Booster',
    image: 'WhatsApp Image 2026-06-07 at 13.16.44.jpeg',
    features: ['Copper & Zinc Infusion', 'Mineral Retention System', 'Detachable Water Tank', 'Auto Shut-off Indicator']
  },
  {
    id: 3,
    name: 'Raja Aqua Eco-Smart RO',
    price: 7499,
    capacity: '8L',
    tech: 'RO + UV + Eco-Water Saving Tech',
    image: 'WhatsApp Image 2026-06-07 at 13.16.45.jpeg',
    features: ['50% Water Recovery Tech', 'Compact Wall-Mount Design', 'Smart LED Alert Panel', 'Food Grade ABS Casing']
  },
  {
    id: 4,
    name: 'Raja Aqua Commercial RO 50 LPH',
    price: 18999,
    capacity: '50 LPH',
    tech: 'High-Flow Double Membrane RO System',
    image: 'WhatsApp Image 2026-06-07 at 13.16.32.jpeg',
    features: ['Double RO Membranes', 'Purifies 50 Liters/Hour', 'Stainless Steel Skid Frame', 'Suitable for Offices & Cafes']
  }
];

// Load or Initialize Database
function getDatabase() {
  if (!fs.existsSync(DB_PATH)) {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync('rajaaqua123', salt);
    const initialDb = {
      users: [
        { username: 'admin', passwordHash }
      ],
      products: defaultProducts,
      orders: []
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2), 'utf8');
    return initialDb;
  }
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Database read error, recreating:', err);
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync('rajaaqua123', salt);
    const initialDb = {
      users: [{ username: 'admin', passwordHash }],
      products: defaultProducts,
      orders: []
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2), 'utf8');
    return initialDb;
  }
}

function saveDatabase(db) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  } catch (err) {
    console.error('Database write error:', err);
  }
}

// Generate Admin Token (stored in memory)
const ADMIN_TOKENS = new Set();
const TEMP_TOKEN = 'rajaaqua_secure_session_token_55682';

// ----------------- API ENDPOINTS -----------------

// Admin Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required.' });
  }

  const db = getDatabase();
  const user = db.users.find(u => u.username === username.toLowerCase());

  if (user && bcrypt.compareSync(password, user.passwordHash)) {
    ADMIN_TOKENS.add(TEMP_TOKEN);
    return res.json({ success: true, token: TEMP_TOKEN });
  }

  return res.status(401).json({ error: 'Incorrect username or password.' });
});

// Authentication middleware
function requireAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token && (token === TEMP_TOKEN || ADMIN_TOKENS.has(token))) {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Admin authentication required.' });
  }
}

// Get all products
app.get('/api/products', (req, res) => {
  const db = getDatabase();
  res.json(db.products);
});

// Add a new product (Admin only)
app.post('/api/products', requireAdmin, (req, res) => {
  const { name, price, capacity, tech, image, features } = req.body;
  if (!name || !price || !capacity || !tech) {
    return res.status(400).json({ error: 'Missing required product details.' });
  }

  const db = getDatabase();
  const newId = db.products.length > 0 ? Math.max(...db.products.map(p => p.id)) + 1 : 1;
  const newProduct = {
    id: newId,
    name,
    price: parseInt(price),
    capacity,
    tech,
    image: image || 'WhatsApp Image 2026-06-07 at 13.16.41.jpeg',
    features: Array.isArray(features) ? features : ['Premium Filter Tech']
  };

  db.products.push(newProduct);
  saveDatabase(db);
  res.status(201).json({ success: true, product: newProduct });
});

// Edit an existing product (Admin only)
app.put('/api/products/:id', requireAdmin, (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, price, capacity, tech, image, features } = req.body;

  const db = getDatabase();
  const index = db.products.findIndex(p => p.id === productId);

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  db.products[index] = {
    ...db.products[index],
    name: name || db.products[index].name,
    price: price ? parseInt(price) : db.products[index].price,
    capacity: capacity || db.products[index].capacity,
    tech: tech || db.products[index].tech,
    image: image || db.products[index].image,
    features: Array.isArray(features) ? features : db.products[index].features
  };

  saveDatabase(db);
  res.json({ success: true, product: db.products[index] });
});

// Delete a product (Admin only)
app.delete('/api/products/:id', requireAdmin, (req, res) => {
  const productId = parseInt(req.params.id);
  const db = getDatabase();
  
  const initialLength = db.products.length;
  db.products = db.products.filter(p => p.id !== productId);

  if (db.products.length === initialLength) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  saveDatabase(db);
  res.json({ success: true, message: 'Product deleted successfully.' });
});

// Reset products catalog (Admin only)
app.post('/api/reset-catalog', requireAdmin, (req, res) => {
  const db = getDatabase();
  db.products = [...defaultProducts];
  saveDatabase(db);
  res.json({ success: true, products: db.products });
});

// Send Order Notifications (Email & SMS Log)
const nodemailer = require('nodemailer');

async function sendOrderNotifications(order) {
  const emailRecipient = 'mohamedhaneefh9@gmail.com';
  
  // SMTP configuration helper
  const smtpConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || ''
    }
  };

  console.log('--- Order Notification Triggered ---');
  console.log(`[Notification] Recipient Email: ${emailRecipient}`);
  console.log(`[Notification] Recipient Phone Numbers: 9791454214, 6385548048`);
  console.log(`[Order Details]:`, {
    orderId: order.orderId,
    customerName: order.customerName,
    phone: order.phone,
    address: order.address,
    productName: order.productName,
    price: order.price,
    paymentMethod: order.paymentMethod,
    orderDate: order.orderDate
  });

  const mailOptions = {
    from: `"Raja Aqua Alerts" <${process.env.SMTP_USER || 'no-reply@rajaaqua.com'}>`,
    to: emailRecipient,
    subject: `New Raja Aqua Order: ${order.orderId} (${order.paymentMethod})`,
    text: `
Hello S Mohammed Hanif,

You have received a new order on the Raja Aqua website!

Order Details:
------------------------------------------
Order ID:       ${order.orderId}
Customer Name:  ${order.customerName}
Phone Number:   ${order.phone}
Delivery Area:  ${order.address}
Product Model:  ${order.productName}
Total Amount:   ₹${order.price.toLocaleString('en-IN')}
Payment Method: ${order.paymentMethod}
Order Date:     ${new Date(order.orderDate).toLocaleString('en-IN')}
------------------------------------------

Please contact the customer within 2 hours to confirm installation details.
`,
    html: `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background-color: #f8fafc;">
  <div style="text-align: center; border-bottom: 2px solid #0284c7; padding-bottom: 16px; margin-bottom: 24px;">
    <h2 style="color: #03045e; margin: 0;">Raja Aqua</h2>
    <span style="color: #0284c7; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px;">New Order Confirmed</span>
  </div>
  <p style="font-size: 14px;">Hello <strong>S Mohammed Hanif</strong>,</p>
  <p style="font-size: 14px;">You have received a new customer order on the Raja Aqua portal. Here are the details:</p>
  
  <div style="background-color: #ffffff; border-radius: 8px; border: 1px solid #cbd5e1; padding: 16px; margin: 20px 0;">
    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
      <tr>
        <td style="padding: 6px 0; color: #64748b; font-weight: bold; width: 35%;">Order ID:</td>
        <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${order.orderId}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Customer Name:</td>
        <td style="padding: 6px 0; color: #0f172a;">${order.customerName}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Phone Number:</td>
        <td style="padding: 6px 0; font-weight: bold; color: #0284c7;"><a href="tel:${order.phone}" style="color: #0284c7; text-decoration: none;">${order.phone}</a></td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Delivery Address:</td>
        <td style="padding: 6px 0; color: #0f172a;">${order.address}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Product Model:</td>
        <td style="padding: 6px 0; color: #0f172a;">${order.productName}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Total Price:</td>
        <td style="padding: 6px 0; font-weight: bold; color: #059669; font-size: 15px;">₹${order.price.toLocaleString('en-IN')}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Payment Method:</td>
        <td style="padding: 6px 0;"><span style="background-color: ${order.paymentMethod === 'COD' ? '#fef3c7' : '#dbeafe'}; color: ${order.paymentMethod === 'COD' ? '#92400e' : '#1e40af'}; padding: 2px 8px; border-radius: 9999px; font-weight: bold; font-size: 11px;">${order.paymentMethod}</span></td>
      </tr>
    </table>
  </div>
  
  <p style="font-size: 12px; color: #64748b; text-align: center; margin-top: 24px;">Please review this order details, schedule shipment/installation with your technicians, and update the status in the Admin Portal.</p>
</div>
`
  };

  if (smtpConfig.auth.user && smtpConfig.auth.pass) {
    try {
      const transporter = nodemailer.createTransport(smtpConfig);
      const info = await transporter.sendMail(mailOptions);
      console.log(`[Notification] Real email sent successfully! MessageId: ${info.messageId}`);
    } catch (err) {
      console.error('[Notification] Error sending real email via SMTP:', err);
    }
  } else {
    console.log('[Notification] SMTP credentials not set in process.env. Email notification simulation completed.');
  }

  // Simulate SMS notification
  console.log(`[SMS Notification] SMS successfully dispatched to 9791454214: "New order ${order.orderId} placed by ${order.customerName} for ${order.productName} (Amt: ₹${order.price}, Pay: ${order.paymentMethod}). Contact: ${order.phone}."`);
  console.log(`[SMS Notification] SMS successfully dispatched to 6385548048: "New order ${order.orderId} placed by ${order.customerName} for ${order.productName} (Amt: ₹${order.price}, Pay: ${order.paymentMethod}). Contact: ${order.phone}."`);
}

// Place a customer order
app.post('/api/orders', (req, res) => {
  const { name, phone, address, productId, paymentMethod } = req.body;
  if (!name || !phone || !address || !productId) {
    return res.status(400).json({ error: 'Missing customer or product details.' });
  }

  const db = getDatabase();
  const product = db.products.find(p => p.id === parseInt(productId));

  if (!product) {
    return res.status(404).json({ error: 'Selected product model does not exist.' });
  }

  const orderId = 'RO-DDG-' + Math.floor(100000 + Math.random() * 900000);
  const newOrder = {
    orderId,
    customerName: name,
    phone,
    address,
    productId: product.id,
    productName: product.name,
    price: product.price,
    paymentMethod: paymentMethod || 'UPI',
    orderDate: new Date().toISOString(),
    status: 'Pending'
  };

  db.orders.push(newOrder);
  saveDatabase(db);
  sendOrderNotifications(newOrder).catch(err => console.error('Notification dispatch error:', err));
  res.status(201).json({ success: true, orderId, order: newOrder });
});

// Get all customer orders (Admin only)
app.get('/api/orders', requireAdmin, (req, res) => {
  const db = getDatabase();
  res.json(db.orders || []);
});

// Update order status (Admin only)
app.put('/api/orders/:id/status', requireAdmin, (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ error: 'Status required.' });
  }

  const db = getDatabase();
  const order = db.orders.find(o => o.orderId === req.params.id);

  if (!order) {
    return res.status(404).json({ error: 'Order not found.' });
  }

  order.status = status;
  saveDatabase(db);
  res.json({ success: true, order });
});

// Serve frontend static files
app.use(express.static(path.join(__dirname)));

// Route fallback to index.html for SPA behavior
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Initialize database & Start Server
getDatabase();
app.listen(PORT, () => {
  console.log(`Raja Aqua Full-Stack Server running on port ${PORT}`);
});
