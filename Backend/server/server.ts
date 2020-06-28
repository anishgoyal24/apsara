import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import { developmentConfig, productionConfig } from './configs';
import { ProductRoutes, CategoryRoutes, UserRoutes } from './api/routes';
import { UserController } from './api/controllers/user.controller';
const multer = require('multer');

// Initiliazing Database Connection
require('./db');

// Defining new Express application
const app = express();

// cors middleware for orign and Headers
app.use(cors());

// Load configuration based on the environment states
if (process.env.NODE_ENV !== 'production') {
    developmentConfig();
}
else {
    productionConfig();
}

// Use Morgan middleware for logging every request status on console
app.use(morgan('dev'));

// Allow any method from any host and log requests
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
});

// Handle POST requests that come in formatted as JSON
app.use(express.json());

// Multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/uploads/images')
      },
      filename: function (req, file, cb) {
        cb(null, req.query['filename'] + '.jpg')
      }
})

var upload = multer({
    storage: storage,
})

app.use(express.static(path.join(__dirname, '../../Client/dist/Client/'), {redirect: false}));

// Handling GZIPPED ROUTES
const encodeResToGzip = (contentType: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        req.url = req.url + '.gz';
        res.set('Content-Encoding', 'gzip');
        res.set('Content-Type', contentType);
        next();
    };
};

// Converting static files to Gzipped Extensions
app.get("*.js", encodeResToGzip('text/javascript'));
app.get("*.css", encodeResToGzip('text/css'));

console.log(path.join(__dirname, '../../Client/dist/Client/'))

// Routes which should handle request
app.all('/', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, '../../Client/dist/Client/index.html'));
});

app.use('/static', express.static(__dirname + '/uploads/images'));

// Product routes
app.use('/api/product', ProductRoutes);

// Category routes
app.use('/api/category', CategoryRoutes);

// User Routes
app.use('/api/user', UserRoutes)

// Upload
app.post('/api/upload', upload.single('image'), (req: any, res)=>{
    res.json({
        message: 'success'
    });
});

// TODO Add routes api

// Invalid routes handling middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('404 not found');
    next(error);
});

// Error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// Compressing the Application
app.use(compression());

// Start server
app.listen(process.env.PORT || 5000);

// Create initial user
let userController = new UserController();
userController.add("hiteshgupta30", "hitesh").then((res)=>{
    console.log("User creation status: " + res);
}).catch((err)=>{
    console.log(err);
})


console.log('Server Started');