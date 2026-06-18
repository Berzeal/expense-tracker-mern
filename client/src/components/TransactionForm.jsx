import { useState } from "react";

function TransactionForm({onAdd}){
    const [formData, setFormData]=useState({
        title:"",
        amount:"",
        type:"expense",
        category:"",
    })

    const handleChange =(e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit =(e)=>{
        e.preventDefault()

        onAdd({...formData, amount:Number(formData.amount)})

        setFormData({
            title:"",
            amount:"",
            type:"expense",
            category:"",
        })
    }



    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
            <input name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-3"
                    />
            <input name="amount"
                    type="number"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-3"
                    />
            <input name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-3"
                    />

            <select name="type" 
                    value={formData.type} 
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-3">
                <option value="expense">Expense</option>
                <option value="income">Income</option>

            </select>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Transaction</button>
        </form>

    )
}

export default TransactionForm;