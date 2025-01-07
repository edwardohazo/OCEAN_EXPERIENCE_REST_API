import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {dbConnect} from './config/dbConnect.js';
import authRoute from './routers/auth.js';
import usersRoute from './routers/users.js';
import servicesRoute from './routers/services.js';
import config from './utils/config.js';
import orderRouter from './routers/orders.js';


// * App configurations

// Server
const app = express();

// Data Base Connection
dbConnect();

// Env Variiables
dotenv.config();

// Dirname 
const __filename = import.meta.url;
const __dirname = fileURLToPath(new URL('.', __filename));

// Port
const port = process.env.PORT || 5000;

// Basic middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());

// Setting static files directory
app.use(express.static(path.join(__dirname, 'public')));

// * Requirments app and middlewares

// Main route
app.get("/", (req, res) => {
    console.log("here i am");
    res.send({description: 'Diving App Server Listening!'});
});

// Routes
app.use('/auth', authRoute);
app.use('/users', usersRoute);
app.use('/services', servicesRoute);
app.use('/api/orders', orderRouter);
app.get('/api/paypal/clientId', (req, res) => {
    res.send({ clientId: config.PAYPAL_API_CLIENT });
});
app.get('/api/paypal/paypalApi', (req, res) => {
    res.send({ paypalApi: config.PAYPAL_API });
});
app.get('/api/paypal/access-token', (req, res) => {
    res.send({ accessToken: config.BRAINTREE_ACCESSTOKEN });
});

// Handling error 404
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong!';
    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});

// Server listening
app.listen(port, () => {
    console.log(`Web site is available at: http://localhost:${port}`);
});
