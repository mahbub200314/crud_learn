require('dotenv').config()
const express = require('express');
const session = require('express-session');

const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes')
const app = express();

app.use(express.json());
app.use(
    session({
        secret: "key",
        resave: false,
        saveUninitialized: false
    })
)

app.use('/api/auth', authRoutes)
app.use('/api/users/', userRoutes);
app.use(errorHandler)


app.get('/', (req, res)=>{
    res.send('api is running')
})

app.listen(process.env.PORT , ()=>{
 console.log(`server is running on http://localhost:${process.env.PORT}`);
})