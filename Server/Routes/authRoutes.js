import express from "express";
import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyToken } from "../Middleware/authMiddleware.js";
import env from "dotenv";
env.config();

const router = express.Router();
const secretKey = process.env.SECRET_KEY;
router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(401).send("User already exists");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(req.body);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      gender: req.body.Gender,
    });
    const token = jwt.sign({ email: user.email, id: user._id }, secretKey);
    res.cookie("auth_token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    console.log("Set-Cookie Header: ", res.get("Set-Cookie"));

    res.status(201).send("User Registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});
// router.get("/login", (req,res)=>{
//   res.send("Login route");
// })

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(400).send("Invalid Details");
    }
    const token = jwt.sign({ email: user.email, id: user._id }, secretKey);
    res.cookie("auth_token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    console.log("Set-Cookie Header: ", res.get("Set-Cookie"));
    res.status(200).send("User Logged in successfully");
  } catch (error) {
    console.error(error);
  }
});

router.post("/logout", (req, res) => {
  console.log(req.cookies.auth_token);
  // console.log(res.cookie.auth_token);
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      sameSite: "None",
      Expires: "Session",
    });
  } catch (error) {
    console.error(error);
    console.log("Error in clearing cookie");
  }
  res.send("Logged out successfully");
});
router.post("/updatePassword", verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const email = req.user.email;
  console.log(email);
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) {
      return res.status(401).send("Invalid current password");
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: newHashedPassword });

    res.status(200).send("Password updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});
export default router;
