require('dotenv').config()
const express = require('express');

const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('api is running')
})

app.use('/api/users/', userRoutes);
app.use(errorHandler)

app.listen(process.env.PORT , ()=>{
 console.log(`server is running on http://localhost:${process.env.PORT}`);
})