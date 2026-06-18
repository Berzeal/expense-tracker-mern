const Transaction = require("../models/Transaction")

const addTransaction = async (req,res)=>{
    try{
        const {title, amount,type,category,date}=req.body;

        //validation
        if(!title||!amount||!type||!category){
            return res.status(400).json({
                message:"Please fill all the fields"
            })

        }
        //create Transaction
        const transaction = await Transaction.create({
            title, amount,type,category,date, user:req.user._id
        })
        res.status(201).json(transaction)

    }catch(error){
        res.status(500).json({
            message:error.message
        })

    }
}

const getTransactions = async (req,res)=>{
    try{
        const transactions = await Transaction.find({
            user:req.user._id,
        }).sort({createdAt:-1})
        res.status(200).json(transactions)


    }catch(error){
        res.status(500).json({
            message:error.message
        })

    }
}

const updateTransaction = async (req,res)=>{
    try{
         const transaction = await Transaction.findById(req.params.id);
         if(!transaction){
            return res.status(404).json({
                message:"Transaction not found",
            })
         }

         //Check ownership
         if(transaction.user.toString()!==req.user._id.toString()){
            return res.status(401).json({
                message:"Not authorized",
            })
         }
        const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id,req.body,{new:true})

        res.status(200).json(updatedTransaction)

    }catch(error){
        res.status(500).json({
            message:error.message
        })

    }
}

const deleteTransaction = async(req,res)=>{
    try{
        const transaction = await Transaction.findById(req.params.id)

        if(!transaction){
            return res.status(404).json({
                message:"Transaction not found",
            })
        }

        //Check ownership
        if(transaction.user.toString()!==req.user._id.toString()){
            return res.status(401).json({
                message:"Not authorized",
            })
        }

        await transaction.deleteOne()

        res.status(200).json({
            message:"Transaction deleted"
        })

    }catch(error){
        res.status(500).json({
            message:error.message
        })

    }
}

module.exports={addTransaction,getTransactions,updateTransaction,deleteTransaction}