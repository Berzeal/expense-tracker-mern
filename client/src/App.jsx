import { BrowserRouter,Routes,Route } from "react-router-dom";

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import ProtectedRoute from "./components/ProtectedRoute";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
          
          }/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    
    </BrowserRouter>
  )
}

export default App;