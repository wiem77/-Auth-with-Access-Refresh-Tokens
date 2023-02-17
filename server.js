const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
//Routes
const authRoutes = require('./routes/auth');
const tokenRoutes = require('./routes/refreshToken');
const userRoutes = require('./routes/users');
const pwdReset = require('./routes/pwdReset');
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
app.use('/api/pwd-reset', pwdReset);

//setPORT

const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`the server is running on ${PORT}`)
);
