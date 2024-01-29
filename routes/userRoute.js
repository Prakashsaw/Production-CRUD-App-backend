import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getOneUser,
  updateUser,
} from "../controllers/userController.js";

// Router Object
const router = express.Router();

// Routers
router.route("/create").post(createUser);
router.route("/get-all-users").get(getAllUser);
router.route("/get-one-user/:id").get(getOneUser);
router.route("/update/:id").put(updateUser);
router.route("/delete/:id").delete(deleteUser);

export default router;
