const express = require('express')

const protect = require('../middleware/authMiddleware')

const {addTransaction,deleteTransaction,getTransactions,updateTransaction} = require('../controllers/transactionController')

const route = express.Router();

route.get('/',protect,getTransactions)

route.post('/',protect,addTransaction)

route.delete('/:id',protect,deleteTransaction)

route.put('/:id',protect,updateTransaction)

module.exports = route;