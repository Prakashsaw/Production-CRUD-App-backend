import express from "express";
import { ResetPassword, SendForgotPasswordEmail, SendOTPForEmailVerification, VerifyEmailThroughOTP, login, loginInitiate, register } from "../controllers/userAuthController.js";

// Router Object
const router = express.Router();

// Routers

// These routes for verify email before starting the registration process
router.route("/send-otp-for-email-verification").post(SendOTPForEmailVerification);
router.route("/verify-email-through-otp/:id").post(VerifyEmailThroughOTP);

// These routes for login and register
router.route("/register").post(register);
router.route("/login-initiate").post(loginInitiate);
router.route("/login").post(login);

// These routes for forgot password and reset password 
router.route("/forgot-password").post(SendForgotPasswordEmail);
router.route("/reset-password/:id/:token").post(ResetPassword);

export default router;
