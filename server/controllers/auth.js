import bcrypt from "bcrypt";  //helps to  encrpyt the password
import jwt from "jsonwebtoken"; //send user web token that can be used for authorization
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {  //destructuring from frontend body
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();  //encryption technique
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({  //if the password matches then we will provide them with json webtoken
      firstName,
      lastName,
      email,
      password: passwordHash,  //we wont store real password
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);  //send status of something has been created
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;  //de-structure
    const user = await User.findOne({ email: email });  //use of mongoose 
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
