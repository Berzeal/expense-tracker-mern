import API from '../services/api'
import { useContext, useState } from 'react';
import { AuthContext } from '../context/Authcontext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [error, setError] = useState("")
const [loading,setLoading]=useState(false)
const {login,user}=useContext(AuthContext)
const navigate = useNavigate()

const handleSubmit=async(e)=>{
  e.preventDefault()
  setError("")
  setLoading(true)
  try {
    const res = await API.post("/auth/login",{email,password})
    login(res.data)
    if(user){
      navigate("/")

    }

    
    
    
  } catch (error) {
    setError(error.response?.data?.message || "Login Failed")

  }
  setLoading(false)
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Login</h1>
        {error &&(<p className='text-red-500 mb-4'>{error}</p>)}
        <input type="email"
              placeholder='email'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className='w-full border p-3 rounded mb-4'/>
        <input type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className='w-full border p-3 rounded mb-4'/>
        <button type='submit' className='w-full bg-blue-500 text-white p-3 rounded' disabled={loading}>{loading?"Logging in...":"Login"}</button>
        <p className='mt-4 text-center'>Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </form>
    </div>
  );
}

export default Login;