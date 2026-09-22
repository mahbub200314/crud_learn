const db = require('../db');
const userModel = require('../models/userModel')



const createUser = async (req, res, next) => {

    const { name, email, age } = req.body;

     try{

        const result = await userModel.createUser(name, email, age);
        res.status(201).json({
            message : 'user create succesfully 👍',
            userId : result.insertId
        })

     }catch(err){
            next(err)
     }
};

//.............................................................

const getUsers = async (req, res) => {


    try{

        const result = await userModel.getUsers();
        res.status(200).json(result)

    }catch(error){
        console.error(error);

        res.status(500).json({
            message: "Failed to get users"
        });
    }
   
};

// .........................................................

const getUsersById = async (req, res)=>{

    const id = req.params.id;

    try{

        const result = await userModel.getUsersById(id);
        
        if(result.length === 0){
            return res.status(404).json({
                message: 'user not found'
            });
        }

        res.status(200).json(result[0])


    }catch(error){
      console.error(error);

        res.status(500).json({
            message: "Failed to get user"
        });
    }
}

// ...................................................

const userUpdate = async (req, res)=>{

    const id = req.params.id;
    const {name, email, age} = req.body;

    try{
        const result = await userModel.updateUserData(id, name, email, age);

          if(result.affectedRows === 0){
            return res.status(404).json({
                message : 'user not found'
            })
        }

        res.status(200).json({
            message : 'user update succesfully'
       
        })

    }catch(err){
         console.error('error :', err);

            return res.status(500).json({
                message : 'failed to update users'
            })
    }
}


//..............................................................

const userDelete = async (req, res)=>{
    
    const id = req.params.id;

    try{

        const result = await userModel.deleteUser(id);
         if(result.affectedRows === 0){
            return res.status(404).json({
                message : 'user not found'
            })
        }

        res.status(200).json({
            message : 'user delete succesfully 🚮🗑️'
        })

    }catch(err){
          if(err){
            console.error('error :', err);

            return res.status(500).json({
                message : 'failed to delete user'
            })
        }
    }
}


module.exports = {
    createUser, getUsers, getUsersById, userUpdate, userDelete
}