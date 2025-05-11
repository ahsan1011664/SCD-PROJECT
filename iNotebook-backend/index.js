const express = require('express');   // importing Express
const mongoose = require("mongoose")
const dotenv = require("dotenv").config();
const cors = require('cors')
const userRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/notesRoutes");

const app = express();   

app.use(cors());
app.use(express.json())  

// const PORT = process.env.PORT;
const mongoDbURI = process.env.MONGO_URI;

app.use('/api/users', userRoutes);
app.use('/api/notes', notesRoutes);

mongoose.connect(mongoDbURI, {}).
then(()=>{
    console.log("MongoDb Successfully Connected.");
}).
catch((err)=>{
    console.log("Error: Unable to Connect to MongoDb.", err);
})

app.listen(5000,'0.0.0.0' ,() => {
    console.log(`iNotebook running on port 5000`);
});
