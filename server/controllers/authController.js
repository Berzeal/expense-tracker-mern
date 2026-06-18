const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const registerUser = async(req,res)=>{
    try{
        const {name,email,password}=req.body;


        if(!name ||!email ||!password){
            return res.status(400).json({
                message:"Please fill all the fields"
            });
        }
        //Check if the user exists
        const existingUser =await User.findOne({email})
       
        if(existingUser){
            return res.status(400).json({
                message:"User already exists"
            })
        }

        //Hash passwords
        const salt = await bcrypt.genSalt(10)

        const hashedPassword =await bcrypt.hash(password, salt);

        //Create User
        const user =await User.create({name,email,password:hashedPassword})

        //Generate JWT Token
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d",})

        res.status(201).json({
            message:"user registered successful",
            token,
            user:{
                id: user._id,
                name:user.name,
                email:user.email,
            }
        })

    }catch(error){
        res.status(500).json({
            message:error.message
        })

    }

}

const loginUser = async (req,res)=>{
    try{
        const {email,password}=req.body;

        //Check if fields are provided
        if(!email || !password){
            return res.status(400).json({
                message:"Please fill all the fields"
            })
        }
        //Check if user exists
        const user =await User.findOne({email})
        console.log(user)

        if(!user){
            return res.status(400).json({
                message:"Invalid Credentials",
            })
        }

        //Compare passwords
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({
                message:"Invalid Credentials",
            })
        }

        //Generate token
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

        //Send Response
        res.status(200).json({
            message:"Login successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        })


    }catch(error){
        res.status(500).json({
            message:error.message
        })

    }
}

module.exports={registerUser,loginUser}