// Login and signup controllers

import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ClientBaseURL } from "../services/ClientBaseURL.js";
import {
  EmailVerificationThroughOTPEmail,
  ForgotPasswordEmail,
  ResetPasswordSuccessEmail,
} from "../services/EmailTemplates.js";
import transporter from "../config/emailConfig.js";
import UserEmailVerificationModel from "../models/UserEmailVerification.js";

export const SendOTPForEmailVerification = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        Status: "failed",
        message: "Email is required.",
      });
    }
    // If email is already exist in User model that means user already registered
    const userAlreadyRegistered = await User.findOne({ email });
    if (userAlreadyRegistered) {
      return res.status(400).json({
        Status: "failed",
        message: "User already registered with this email.",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    // If user already exists then modify with new OTP
    const userExist = await UserEmailVerificationModel.findOne({ email });
    let user;
    if (userExist) {
      await UserEmailVerificationModel.findOneAndUpdate(
        { email },
        { otp, expires: Date.now() + 600000 }
      );
      user = await UserEmailVerificationModel.findOne({ email });
    } else {
      const newUser = new UserEmailVerificationModel({ email, otp });
      await newUser.save();
      user = newUser;
    }

    // First send email verification OTP
    const info = await transporter.sendMail({
      from: {
        name: "User Management App",
        address: process.env.EMAIL_FROM,
      },
      to: user.email,
      subject: "User Management App: OTP for Email Verification",
      html: EmailVerificationThroughOTPEmail(user, otp, process.env.EMAIL_FROM),
    });

    // Then save into database
    await user.save();

    res.status(200).json({
      Status: "Success",
      message:
        "OTP sent to your email. Please verify OTP for email verification...!",
      id: user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message:
        "Internal server error. Unable to send email verification link...!",
    });
  }
};

export const VerifyEmailThroughOTP = async (req, res) => {
  try {
    const { id } = req.params;
    const { otp } = req.body;
    if (!otp) {
      return res.status(400).json({
        Status: "failed",
        message: "OTP is required.",
      });
    }
    const user = await UserEmailVerificationModel.findById(id);
    if (!user) {
      return res.status(400).json({
        Status: "failed",
        message: "User doesn't exist or Invalid OTP.",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        Status: "failed",
        message: "Invalid OTP.",
      });
    }

    const userEmail = user.email;
    await UserEmailVerificationModel.findByIdAndDelete(id);

    res.status(200).json({
      Status: "Success",
      message: "Email verified successfully ...!",
      email: userEmail,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message:
        "Internal server error. Unable to verify OTP for email verification...!",
    });
  }
};

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

export const loginInitiate = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        Status: "failed",
        message: "Email is required.",
      });
    }
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(400).json({
        Status: "failed",
        message: "User doesn't exist.",
      });
    }
    res.status(200).json({
      Status: "Success",
      message: "User found successfully ...!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Internal server error. Unable to login...!",
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
      user: { token: token, name: userExist.name, id: userExist._id },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Internal server error. Unable to login...!",
    });
  }
};

// Forgot password controller
export const SendForgotPasswordEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        Status: "failed",
        message: "Email is required.",
      });
    }
    const userExist = await User.findOne({
      email: email,
    });
    if (!userExist) {
      return res.status(400).json({
        Status: "failed",
        message: "User doesn't exist.",
      });
    }

    const secrete = userExist._id + process.env.JWT_SECRETE_KEY;
    const token = jwt.sign({ _id: userExist._id }, secrete, {
      expiresIn: "15m",
    });

    const reset_password_link = `${ClientBaseURL}/reset-password/${userExist._id}/${token}`;

    // Now Send Email
    const info = await transporter.sendMail({
      from: {
        name: "User Management App",
        address: process.env.EMAIL_FROM,
      },
      to: userExist.email,
      subject: "Reset your User Management App account password",
      html: ForgotPasswordEmail(
        userExist,
        reset_password_link,
        process.env.EMAIL_FROM
      ),
    });
    res.status(200).json({
      Status: "Success",
      message: "Reset password link sent to your email...!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Internal server error. Unable to send reset password link...!",
    });
  }
};

// Reset password controller
export const ResetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        Status: "failed",
        message: "New password is required.",
      });
    }

    const userExist = await User.findOne({
      _id: id,
    });
    if (!userExist) {
      return res.status(400).json({
        Status: "failed",
        message: "User doesn't exist.",
      });
    }
    const secrete = userExist._id + process.env.JWT_SECRETE_KEY;
    try {
      await jwt.verify(token, secrete);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await User.findByIdAndUpdate(id, { password: hashedPassword });

      // Now Send Email
      const info = await transporter.sendMail({
        from: {
          name: "User Management App",
          address: process.env.EMAIL_FROM,
        },
        to: userExist.email,
        subject:
          "Your User Management App account password has been reset successfully",
        html: ResetPasswordSuccessEmail(userExist, process.env.EMAIL_FROM),
      });

      res.status(200).json({
        Status: "Success",
        message: "Password reset successfully...!",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        Status: "failed",
        message: "Invalid or expired token. Try again...!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Internal server error. Unable to reset password...!",
    });
  }
};
