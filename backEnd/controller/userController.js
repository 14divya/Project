const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');
const validateMongoDbId = require('../utils/validateMongoDbId');
const { generateRefreshToken } = require('../config/refreshToken');
const jwt = require('jsonwebtoken');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    else {
        // res.json({
        //     msg:"User already exists",
        //     success: false,
        // });
        throw new Error('User already exists');
    }
});

const loginUserController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser && await findUser.isPasswordMatched(password)) {
        const refreshtoken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(findUser.id, {
            refreshToken: refreshtoken,
        }, {
            new: true,
        });
        res.cookie('refreshToken', refreshtoken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1800,
        })
        res.json({
            _id: findUser?._id,
            username: findUser?.username,
            email: findUser?.email,
            token: generateToken(findUser?._id),
        });
    } else {
        throw new Error("Invalid credentials");
    }
});

const loginAdminController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findAdmin = await User.findOne({ email });
    if(findAdmin.role !== 'admin') throw new Error('Not Authorized');
    if (findAdmin && await findAdmin.isPasswordMatched(password)) {
        const refreshtoken = await generateRefreshToken(findAdmin?._id);
        const updateuser = await User.findByIdAndUpdate(findAdmin.id, {
            refreshToken: refreshtoken,
        }, {
            new: true,
        });
        res.cookie('refreshToken', refreshtoken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1800,
        })
        res.json({
            _id: findAdmin?._id,
            username: findAdmin?.username,
            email: findAdmin?.email,
            token: generateToken(findAdmin?._id),
        });
    } else {
        throw new Error("Invalid credentials");
    }
});


const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error('No refresh token in cookie');
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error('No refresh token in db or not matched');
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error('There is something wrong with refresh token');
        }
        const accessToken = generateToken(user?._id);
        res.json({ accessToken });
    });
});

const logout = asyncHandler(async(req,res)=>{
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error('No refresh token in cookie');
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if(!user){
        res.clearCookie('refreshToken',{
            httpOnly:true,
            secure: true,
        });
        return res.sendStatus(204);
    }
    await User.findOneAndUpdate(refreshToken,{
        refreshToken: "",
    });
    res.clearCookie('refreshToken',{
        httpOnly:true,
        secure: true,
    });
    return res.sendStatus(204);
});
const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);
    }
});
const getAUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getAUser = await User.findById(id);
        res.json({
            getAUser,
        });
    } catch (error) {
        throw new Error(error);
    }
});
const deleteAUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteAUser = await User.findByIdAndDelete(id);
        res.json({
            deleteAUser,
        });
    } catch (error) {
        throw new Error(error);
    }
});
const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const updateUser = await User.findByIdAndUpdate(_id, {
            username: req?.body?.username,
            email: req?.body?.email,
        },
            {
                new: true,
            });
        res.json(updateUser);
    } catch (error) {
        throw new Error(error);
    }
});

const userCart = asyncHandler(async(req,res)=>{
    const { cart } = req.body;
    console.log(cart);
    const { _id } = req.user;
    console.log(_id);
    validateMongoDbId(_id);
    
    try{
        let products = [];
        const user = await User.findById(_id);
        const alreadyExist = await Cart.findById({ orderBy: user._id});
        if(alreadyExist){
            alreadyExist.remove();
        }
        for(let i = 0; i < cart.length; i++){
            let object = {};
            object.product = cart[i]._id;
            products.push(object);
        }
        console.log(products);
    }catch(error){
        throw new Error(error);
    }
})

module.exports = { 
    createUser, 
    loginUserController, 
    getAllUser, 
    getAUser, 
    deleteAUser, 
    updateUser, 
    handleRefreshToken,
    logout,
    loginAdminController,
    userCart,
 };