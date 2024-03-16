// Login and signup controllers

import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        Status: "failed",
        message: "Marked with * fields are required...!",
      });
    }
    // Check if user already exists
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({
        Status: "failed",
        message: "User already exists...!",
      });
    }

    // Bcrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({ name, email, phone, password: hashedPassword });
    await user.save();

    res.status(200).json({
      Status: "Success",
      message: "User registered successfully ...!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Internal server error. Unable to register...!",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        Status: "failed",
        message: "All fields are required...!",
      });
    }
    const userExist = await User.findOne({
      email: email,
    });
    if (!userExist) {
      return res.status(400).json({
        Status: "failed",
        message: "Invalid credentials...!",
      });
    }
    //   Compare the password
    const validPassword = await bcrypt.compare(password, userExist.password);
    if (!validPassword) {
      return res.status(400).json({
        Status: "failed",
        message: "Invalid credentials...!",
      });
    }
    //   Create and assign a token
    const token = jwt.sign(
      { _id: userExist._id },
      process.env.JWT_SECRETE_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      Status: "Success",
      message: "User logged in successfully ...!",
      user: { token: token, name: userExist.name },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Internal server error. Unable to login...!",
    });
  }
};
