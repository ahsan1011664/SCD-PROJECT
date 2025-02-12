const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config();

// Authentication Middleware
const authenticateUser = async (req, res, next) => {

    // Extracting token from authorization header
    const token = req.headers["authorization"].split(' ')[1];

    if (!token)
    {
        return res.status(401).json({ message: "Access denied! No token Provided" });
    }

    try {
        const secretKey = process.env.JWT_SECRET;
        
        const decodedToken = jwt.verify(token,  secretKey);
        req.user = decodedToken;

        next();

    } catch (error) {
        res.status(401).json({ message: "Invalid Access/Token." });
    }

}

module.exports = {authenticateUser};
