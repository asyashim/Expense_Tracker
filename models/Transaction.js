import mongoose from "mongoose";
const TransactionSchema  = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    type:{
        type:String,
        enum:["income","expense"],
        required:true,

    },
    date:{
        type:Date,
        default:Date.now,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,  
    },
    category:{
        type:String,
        default:"General",
    }
})

const Transaction =mongoose.model("Transaction",TransactionSchema);
export default Transaction;