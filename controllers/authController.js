const bcrypt = require('bcrypt');
const authModel = require('../models/authModel')


const register = async (req, res)=>{

    const {name, email, password} = req.body;

    const hassedpass = await bcrypt.hash(password, 10);

    const result = await authModel.registerUser(name, email, hassedpass)

     res.status(201).json({
        message: "user register succesfull",
        userName : name ,
        userId: result.insertId
    });
}



// get register user with login

const login = async (req, res)=>{
  
    const {email, password}= req.body;

    const users = await authModel.getUserByEmail(email);

     if (users.length === 0) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare( password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    req.session.userId = user.id

    res.status(200).json({
        message: "Login successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
}

const logout = (req, res)=>{

    req.session.destroy((err)=>{
        if(err){
           console.log(`logout error :`, err)
            return res.status(500).json({
                message: 'logout failed'
            })
        }
        res.status(200).json({
            message:'logout done'
        })
    })
};


const profile = async (req, res)=>{
      
   
    if(!req.session.userId){
        
        return res.status(401).json({
            message: 'please login first.'
        })
    }

    const userdata = await authModel.getUserById(req.session.userId);
    
    res.status(200).json(userdata[0])
}
module.exports = { register, login, profile, logout};