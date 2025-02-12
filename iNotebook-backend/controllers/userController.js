const User  = require('../models/User');
const bcrypt = require('bcrypt');       
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
    
    const {name, email, password} = req.body;
    try {
        
        let user = await User.findOne({email: email});  
        if (user)
        {
            return res.status(400).json({error: "User Already Registered"})
        }
            
        // Hashing the password before storing it
        const securedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name: name,
            email: email,
            password: securedPassword
        })

        res.json({message: "User Registered Successfully"});  
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    } 
}

const loginUser = async (req, res) => {
    
    const {email, password} =  req.body; 

    try {

        let user = await User.findOne({email});

        // Checking if the user exists
        if (!user)
        {
            return res.status(400).json({ errors: "Invalid Email or Password!" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        
        if (!passwordCompare){
            return res.status(400).json({ errors: "Invalid Email or Password!" });
        }

        const authToken = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '30m'});
        res.json({token: authToken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

const getUserDetails = async(req, res) => {
    try {

        const userId = req.user.id;       
        const user = await User.findById(userId).select("-password"); 
        res.send(user); 
        
       } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
       }
}

module.exports = {registerUser, loginUser, getUserDetails }