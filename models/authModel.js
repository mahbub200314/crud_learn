const db = require('../db');

const registerUser = async (name, email, hassedpass)=>{

    const sql = ` INSERT INTO users(name, email, password)
    
                  VALUES(?, ?, ?)
                  `

    const [result] = await db.query(sql, [name, email, hassedpass]);
    
    return result;
};


const getUserByEmail = async (email)=>{

    const sql = `SELECT * FROM users WHERE email =?`;

    const [result] = await db.query(sql, [email]);

    return result;
}

const getUserById = async (id)=>{

    const sql = `SELECT id, name, email, age FROM users WHERE id = ?`;

    const [result] = await db.query(sql, [id]);
    return result;
}

module.exports = {registerUser, getUserByEmail, getUserById};