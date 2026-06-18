import axios from "axios";

const API = axios.create({
    baseURL:"http://localhost:5000/api",
})

API.interceptors.request.use(
    (config)=>{
        const storedUser = localStorage.getItem("user");
        if(storedUser){
            const authData =JSON.parse(storedUser);
            config.headers.Authorization= `Bearer ${authData.token}`;
        }
        return config
    }, 
    (error)=>{
        return Promise.reject(error)
    }
)

API.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response?.status===401){
            localStorage.removeItem("user");
            window.location.href="/login";


        }
        return Promise.reject(error)
    }
)

export default API;