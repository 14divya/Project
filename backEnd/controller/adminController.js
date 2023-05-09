const Admin = require('../models/adminModel');
const createAdmin = async (req,res) =>{
    const email = req.body.email;
    const findAdmin = await Admin.find(email);
    if(!findAdmin){
        const newAdmin = Admin.create(req.body);
        res.json(newAdmin);
    }
    else{
        res.json({
            msg:"Admin already exists",
            success: false,
        });
    }
};
module.exports = { createAdmin };