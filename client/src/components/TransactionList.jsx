function TransactionList ({transactions, onDelete}){
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Transactions</h2>
            {transactions.length===0?(<p>No transactions found. </p>):(
                transactions.map((transaction)=>(
                    <div key={transaction._id} className="flex justify-between items-center border-b py-3">
                        <div className="font-medium">
                            <h3 className="font-medium">{transaction.title}</h3>
                            <p className="text-sm text-gray-500">{transaction.category}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={transaction.type==="income"?"text-green-600":"text-red-600"}>{transaction.amount}</span>
                            <button onClick={()=>onDelete(transaction._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>

                        </div>
                    </div>
                ))
            )}

        </div>
    )


}
export default TransactionList;