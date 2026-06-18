import { useContext, useState, useEffect } from "react";
import {AuthContext} from '../context/Authcontext'
import { useNavigate } from "react-router-dom";
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import SummaryCards from '../components/SummaryCards'
import API from '../services/api'

function Dashboard() {
  const navigate = useNavigate()
  const {user, logout}=useContext(AuthContext)
  const handleLogout =()=>{
    logout()
    navigate("/login")
  }
  const [transactions, setTransactions]=useState([])

  useEffect(()=>{
    
    
    fetchTransactions()
  },[])


 const fetchTransactions=async()=>{
      try {
      const res = await API.get("/transactions")
      setTransactions(res.data)

      
    } catch (error) {
      console.log(error.response?.data)
      
    }

    }

const addTransaction = async (transactionData) => {
  try {
    const res = await API.post("/transactions", transactionData);

    setTransactions((prevTransactions) => [
      ...prevTransactions,
      res.data,
    ]);

  } catch (error) {
    console.log(error);
  }
};

const deleteTransaction = async (id)=>{
  try {
    await API.delete(`/transactions/${id}`);
    setTransactions(transactions.filter((t)=>t._id!==id))
    
  } catch (error) {
    console.log(error)
    
  }

}


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome{" "}{user?.user?.name}</h1>
        <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleLogout}>Logout</button>
      </div>
      <SummaryCards transactions={transactions}/>
      <TransactionForm onAdd={addTransaction}/>
      <TransactionList transactions={transactions} onDelete={deleteTransaction}/>
     
    </div>
  );
}

export default Dashboard;