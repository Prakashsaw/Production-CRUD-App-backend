import express from "express";
import { login, register } from "../controllers/userAuthController.js";

// Router Object
const router = express.Router();

// Routers
router.route("/register").post(register);
router.route("/login").post(login);

export default router;
