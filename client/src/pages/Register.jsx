import {useState,useEffect,useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';
import API from '../services/api';

function Register() {
  const [name, setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)

  const {login, user} =useContext(AuthContext)
  const navigate=useNavigate();
  useEffect(()=>{
    if(user){
      navigate("/")
    }
  },[user,navigate])

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setError("")
    setLoading(true);
    try {
      const res = await API.post("/auth/register",{name,email,password});
      console.log(res)
      login(res.data)
      navigate("/")
      
    } catch (error) {
      setError(error.response?.data?.message || "Registration Failed")

      
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded-xl w-full max-w-md'>
        <h1 className='text-3xl font-bold text-center mb-6'>Create Account</h1>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <input type="text" 
                placeholder="Full name" 
                value={name} 
                onChange={(e)=>setName(e.target.value)}
                className='w-full border p-3 rounded mb-4'/>

        <input type="email"
                placeholder='Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className='w-full border p-3 rounded mb-4'/>
        <input type="password"
                placeholder='Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className='w-full border p-3 rounded mb-6'/>
        <button type="submit" disabled={loading}
        className='w-full bg-green-600 text-white p-3 hover:bg-green-700 rounded'>{loading?"Creating account...":"Register"}</button>
        <p className='text-center mt-4'>
          Already have an account?{" "}
          <Link to="/login" className='text-blue-600 hover:underline'>Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;