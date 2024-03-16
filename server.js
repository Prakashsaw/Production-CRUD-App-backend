import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/connectDB.js";
import colsor from "colors";
import userRoute from "./routes/userRoute.js";
import userAuthRoute from "./routes/userAuthRoute.js";

// Config the dot env file
dotenv.config();

// Data base connectivity
connectDB();

// Creating express server app
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// API end point
app.use("/api/v1/user-auth", userAuthRoute);
app.use("/api/v1/users", userRoute);

// PORT
const PORT = process.env.PORT || 8080;

// Server working URL
app.get("/", (req, res) => {
  return res.send(`<div style = "background:green;padding:100px;"><h2>Welcome to User CRUD API Backend Server URL...</h2>
    <p>Below are the some examples of supported routes...</p>
        <div><ul>
            <h3>User Route</h3>
            <li>Create User - /api/v1/users/create</li>
            <li>Get all Users - /api/v1/users/get-all-user</li>
            <li>Get One User - /api/v1/users/get-one-user/:id</li>
            <li>Update User - /api/v1/users/update/:id</li>
            <li>Detete User - /api/v1/users/detele/:id</li>
            
            <li>Much more...</li>
        </ul></div>
    </div>`);
});

// Listen server
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}...`.bgWhite.white);
});
