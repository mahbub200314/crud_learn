const db = require('../db');


// create/store user data
const createUser = async (name, email, age)=>{

     const sql = `
      INSERT INTO users (name , email, age)
      Values(?, ?, ?)
   `

   const [result] = await db.query(sql, [name, email, age])
   
   return result;
};



// read user data..........................

const getUsers = async ()=>{
    
    const sql = 'SELECT * FROM users';

    const [rows] = await db.query(sql)

    return rows;
}



// read user by id....................
const getUsersById = async (id)=>{
    
    const sql = `SELECT * FROM users WHERE id = ?`;

    const [rows] = await db.query(sql, [id]);
    
    return rows;
}


// udate user data..................
const updateUserData = async (id, name, email, age)=>{
  
    const sql=`
       UPDATE users 
       SET name = ?, email = ? , age = ?
       WHERE id = ?
    `

   const [rows] = await db.query(sql, [name, email, age, id]);
   return rows;
}


// delete users data 

const deleteUser = async (id,) => {

    const sql = "DELETE FROM users WHERE id = ?";

    const [rows] = await db.query(sql, [id]);
    
    return rows;
};


module.exports = {
    createUser, getUsers, getUsersById, updateUserData, deleteUser

}