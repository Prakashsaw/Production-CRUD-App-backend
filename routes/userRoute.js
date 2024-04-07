import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getOneUser,
  updateUser,
} from "../controllers/userController.js";
import checkUserAuth from "../middlewares/userAuth.js";
import upload from "../config/multerUploadConfig.js";

// Router Object
const router = express.Router();

// Middlewares: calling checkUserAuth middleware for all routes to check user authentication
router.use(checkUserAuth);

// Routes
router.route("/create").post(upload.single("picture"), createUser);
router.route("/get-all-users").post(getAllUser);
router.route("/get-one-user/:id").get(getOneUser);
router.route("/update/:id").put(updateUser);
router.route("/delete/:id").delete(deleteUser);

export default router;
