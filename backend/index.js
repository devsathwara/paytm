const express = require("express");
const {userRoutes} = require('./routes/index');
const cors = require('cors')
const app = express();
const db=require('./db');
const config=require('./config/config')

app.use(express.json())
app.use('/api/vi/user',userRoutes);
app.use(cors());
app.listen(config.env.app.port,()=>{
    console.log(`Server is running at http://localhost:8080`);
})



