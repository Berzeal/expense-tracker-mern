import { createContext, useState } from "react";

export const AuthContext = createContext()

export function AuthProvider({children}){
    let initialUser = null;
    try {
        const storedUser = localStorage.getItem('user')
        initialUser=storedUser?JSON.parse(storedUser):null;
        
    } catch (error) {
        console.log(error)
        
    }
    const [user,setUser]=useState(initialUser)

    const login=(userData)=>{
        setUser(userData)
        localStorage.setItem("user",JSON.stringify(userData))
    }

    const logout =()=>{
        setUser(null)
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}

        </AuthContext.Provider>
    )
}