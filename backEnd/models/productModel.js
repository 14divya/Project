const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    productId:{
        type:String,
        required:true,
        unique:true,
    },
    slug:{
        type:String,
        unique:true,
    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    images:{
        type:Array,
    },
    features:{
        type:String,
        required:true,
    },
    applications:{
        type:String,
        required:true,
    },
    orderInfo:{
        type:Array,
    },
    specifications:{
        type:Array,
    },
    connectionDiagram:{
        type:Array,
    },
},{
    timestamps:true,
});

//Export the model
module.exports = mongoose.model('Product', productSchema);