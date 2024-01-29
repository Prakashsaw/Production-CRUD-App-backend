import validator from "validator";
import UserModel from "../models/userModel.js";

export const createUser = async (req, res) => {
  const { name, email, phone, address } = req.body;

  try {
    if (!name || !email || !phone || !address) {
      console.log("All fields are required...!");
      return res.status(400).json({
        Status: "failed",
        message: "All fields are required...!",
      });
    }

    // Check that that user with this email already exist or not
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        status: "failed",
        message: "User already created with this email...!",
      });
    }

    // Validate the email that email entered is in correct email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        Status: "failed",
        message: "Email must be a valid email...!",
      });
    }

    if (!validator.isMobilePhone(phone) || phone.length !== 10) {
      return res.status(400).json({
        Status: "failed",
        message: "Invalid Phone number. Phone number must be of 10 digits...!",
      });
    }

    const newUser = new UserModel({
      name: name,
      email: email,
      phone: phone,
      address: address,
    });

    // Save into database
    await newUser.save();

    res.status(200).json({
      success: true,
      user: newUser,
      Status: "Success",
      message: "User created successfully...!",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "Unable to create user...!",
      error: error,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const allUsers = await UserModel.find({});
    if (!allUsers) {
      return res.status(400).json({
        Status: "failed",
        message: "User not found...!",
      });
    }

    res.status(200).json({
      Status: "Success",
      message: "All Users fetched successfully ...!",
      users: allUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "Unable to fetch all users...!",
    });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await UserModel.findById({ _id: id });

    if (!userExist) {
      return res.status(400).json({
        Status: "failed",
        message: "User not found...!",
      });
    }

    res.status(200).json({
      Status: "Success",
      message: "User details fetched successfully ...!",
      user: userExist,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "Unable to fetch the details...!",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await UserModel.findById({ _id: id });
    if (!userExist) {
      return res.status(400).json({
        Status: "failed",
        message: "User not found...!",
      });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    res.status(200).json({
      Status: "Success",
      message: "User detail updated successfully ...!",
      user : updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "Unable to update the user detail...!",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await UserModel.findById({ _id: id });
    if (!userExist) {
      return res.status(400).json({
        Status: "failed",
        message: "User not found...!",
      });
    }

    await UserModel.findByIdAndDelete({ _id: id });

    res.status(200).json({
      status: "Success",
      message: "User deleted successfully...!",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "Unable to delete the user...!",
    });
  }
};
