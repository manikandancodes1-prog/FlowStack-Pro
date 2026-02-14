const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cardRoutes = require('./routes/cardRoutes');


dotenv.config();


connectDB();

const app = express();

// --- Middlewares ---


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use(express.json());

// --- API Routes ---


app.use('/api/auth', authRoutes);


app.use('/api/cards', cardRoutes);


app.get('/', (req, res) => {
  res.send('🚀 FlowStack Pro API is running smoothly...');
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  -----------------------------------------
  ✨ FlowStack Pro Backend Started!
  📡 URL: http://localhost:${PORT}
  🚀 Ready to serve requests...
  -----------------------------------------
  `);
});