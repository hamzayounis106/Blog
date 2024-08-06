import env from "dotenv";
env.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import authRoutes from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import postRoutes from "./Routes/postRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import Admin from "./Models/Admin.js";
import bcrypt from "bcrypt";
const app = express();

mongoose.connect(process.env.MONGO_URI);

app.use(express.json({ limit: "0.5mb" }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://blog-client-bice.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/admin", adminRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("You should not come here :)");
});
const createAdmin = async (userName, email, Password) => {
  try {
    const hashedPassword = await bcrypt.hash(Password, 10);
    const newAdmin = await Admin.create({
      username: userName,
      email: email,
      password: hashedPassword,
    });
    console.log("Admin Created: ", newAdmin);
  } catch (error) {
    console.error("Admin Creation Failed: ", error);
  }
};
// createAdmin("admin", "hamzayounis105@gmail.com", "admin");
