function SummaryCards({transactions}){
    const income = transactions.filter(t=>t.type==='income').
    reduce((sum,t)=>sum +t.amount,0)

    const expense = transactions.filter(t=>t.type==='expense').
    reduce((sum,t)=>sum +t.amount,0)

    const balance = income-expense

    return (
        <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold">Balance</h3>
                <p className="text-2xl font-bold">${balance}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold">Income</h3>
                <p className="text-2xl font-bold">${income}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold">Expense</h3>
                <p className="text-2xl font-bold">${expense}</p>
            </div>
        </div>
    )


}

export default SummaryCards;