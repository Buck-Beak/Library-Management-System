require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/book');
const cors = require('cors');


//express app
const app = express();
app.use(cors());

//middleware
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})

//routes
app.use('/api/book',bookRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        // listen for requests
        app.listen(process.env.PORT,()=>{
            console.log('connected to db and listening on port 4000');
        });
    })
    .catch((error)=>{
        console.log(error);
    });
