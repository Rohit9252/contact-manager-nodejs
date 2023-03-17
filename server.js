const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');
const app = express();

connectDb();
const port = process.env.PORT || 5000;


app.get("/",(req,res)=>{
    res.status(200).json({message: "Welcome to Contact Keeper API"});
});

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use(errorHandler)


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});

