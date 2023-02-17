const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');

const authRoutes = require('./routes/auth');
const tokenRoutes = require('./routes/refreshToken');
const userRoutes = require('./routes/users');
require('dotenv').config({ path: './config/.env' });
const app = express();
//connection to DB
dbConnect();
//middlewares
app.use(express.json());
app.use(cors());

//routes

app.use('/api', authRoutes);
app.use('/api/refreshToken', tokenRoutes);
app.use('/api/user', userRoutes);
//setPORT
const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`the server is running on ${PORT}`)
);
