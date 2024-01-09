const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");


const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: 259200 });
};

const signupUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {

        if (
            !email ||
            !password ||
            !firstName ||
            !lastName 
        
        ) {
            throw Error("All fields must be filled");
        }
        if (!validator.isLength(password, { min: 8 })) {
            throw new Error("Password must be at least 8 characters long");
        }
        if (!validator.isEmail(email)) {
            throw Error("Email not valid");
        }
        if (!validator.isStrongPassword(password)) {
            throw Error("Password not strong enough");
        }

        const existingUsers = await userModel.findOne({ email: email });
        if (existingUsers) {
            throw Error("User already exists"); 
        }
        const hashedPassword = bcrypt.hashSync(password, 12);
        const user = new userModel({
            firstName,
            lastName,
            email,
            password:hashedPassword
        });

        await user.save();

        const token = createToken(user._id);
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw Error("Email and password are required");
        }

        const user = await userModel.findOne({ email: email });
        if (!user) {
            throw Error("Invalid email");
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            throw Error("Invalid password");
        }

        const token = createToken(user._id);
        res.status(200).json({ token,user });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};


module.exports = {
    signupUser,
    loginUser
}
