const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"],
        trim:true,
    },
    amount:{
        type:Number,
        required:[true,"Amount is required"],
    },
    type:{
        type:String,
        required:true,
        enum:["income","expense"]
    },
    category:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{timestamps:true})

module.exports=mongoose.model("Transaction",transactionSchema)