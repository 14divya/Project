const bodyParser = require('body-parser');
const express = require('express');
const dbConnect = require('./config/dbConnect');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000;
const authRouter = require('./routes/authRoute')
const productRouter = require('./routes/productRoute');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

app.use(cors({
    origin:"http://127.0.0.1:5000/api/product",
}));


dbConnect();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/user',authRouter);
app.use('/api/product',productRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
});