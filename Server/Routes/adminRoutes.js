import express from "express";
import Admin from "../Models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { verifyToken } from "../Middleware/authMiddleware.js";
import { adminVerifyToken } from "../Middleware/adminAuthMiddleware.js";
import env from "dotenv";
import Post from "../Models/Post.js";
import User from "../Models/user.js";
env.config();
const router = express.Router();

router.post("/adminLogin", async (req, res) => {
  console.log(req.body.username);
  const { username, password } = req.body;
  console.log(username + " " + password);
  if (!username || !password) {
    res.status(400).send("Please fill all the fields");
    return;
  }
  try {
    const admin = await Admin.findOne({ username: username });
    if (!admin) {
      console.log("Admin not found");
      // res.status(200).send("Admin not found");
      res.status(404).send("Admin not found");
      return;
    }
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      console.log("Invalid Details");
      res.status(400).send("Invalid Details");
      return;
    }
    const token = jwt.sign(
      { username: admin.username },
      process.env.SECRET_KEY
    );
    console.log(token);
    res.cookie("admin_auth", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.status(200).send({ username: admin.username, email: admin.email });
  } catch (error) {
    console.error("Login failed", error);
    res.sendStatus(500);
  }
});

router.post("/adminLogout", (req, res) => {
  console.log("Logging out: " + req.cookies.admin_auth);
  try {
    res.clearCookie("admin_auth", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.sendStatus(200);
  } catch (error) {
    console.error("Error clearing cookie:", error);
    res.sendStatus(500);
  }
});

// router.post("/adminUpdate", adminVerifyToken, async (req, res) => {
//   console.log(req.body);
//   const decoded = req.user;
//   console.log(decoded);
//   if (!req.body) {
//     res.status(400).send("No changes detected");
//     console.log("No changes detected");
//     return;
//   }
//   console.log("moving ahead");
//   try {
//     if (decoded.username) {
//       console.log("Username is " + decoded.username);
//       const admin = await Admin.findOne({ username: decoded.username });
//       console.log(admin);
//       if (!admin) {
//         res.status(404).send("Admin not found");
//         return;
//       }
//       if (req.body.email && req.body.email !== "") {
//         admin.email = req.body.email;
//         console.log("Email updated");
//       }
//       if (req.body.username && req.body.username !== "") {
//         admin.username = req.body.username;
//         console.log("Username updated");
//       }
//       if (req.body.password && req.body.password !== "" && req.body.currentPassword && req.body.currentPassword !== "") {
//         const verify = await bcrypt.compare(req.body.currentPassword, admin.password);
//         if (!verify) {
//           res.status(400).send("Invalid current password");
//           return;
//         }
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         admin.password = hashedPassword;
//         console.log("Password updated");
//       }
//       await admin.save();
//       console.log("Profile updated successfully");
//       res.status(200).send("Profile updated successfully");
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred while updating the profile");
//   }
// });

router.post("/adminUpdate", adminVerifyToken, async (req, res) => {
  console.log(req.body);
  const decoded = req.user;
  console.log(decoded);
  if (!req.body) {
    res.status(400).send("No changes detected");
    console.log("No changes detected");
    return;
  }
  console.log("moving ahead");
  try {
    if (decoded.username) {
      console.log("Username is " + decoded.username);
      const admin = await Admin.findOne({ username: decoded.username });
      console.log(admin);
      if (!admin) {
        res.status(404).send("Admin not found");
        console.log("Admin not found");
        return;
      }

      if (!req.body.email == "") {
        admin.email = req.body.email;
        console.log("Email updated");
      }
      console.log("email chceked");
      if (!req.body.username == "") {
        admin.username = req.body.username;
        console.log("Username updated");
      }
      console.log("username checked");

      if (!req.body.password == "") {
        console.log("password checked");
        console.log("verifying");
        const verify = await bcrypt.compare(
          req.body.currentPassword,
          admin.password
        );
        console.log(verify);
        if (!verify) {
          res.status(400).send("Invalid current password");
          return;
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        admin.password = hashedPassword;
        console.log("Password updated");
      }
      await admin.save();
      console.log("Profile updated successfully");
      res.status(200).send("Profile updated successfully");
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/checkAuthAdmin", adminVerifyToken, (req, res) => {
  res.sendStatus(200);
});

router.get("/allPostsA", adminVerifyToken, async (req, res) => {
  try {
    const allPosts = await Post.find();
    if (!allPosts) {
      res.status(404).send("No Posts Found");
      return;
    }
    res.status(200).send(allPosts);
  } catch (error) {}
});

router.get("/allUsersA", adminVerifyToken, async (req, res) => {
  try {
    const allUsers = await User.find();
    if (!allUsers) {
      res.status(404).send("No Users Found");
      return;
    }
    res.status(200).send(allUsers);
  } catch (error) {}
});
router.post("/deleteUserAdminC", adminVerifyToken, async (req, res) => {
  const userId = req.body.userID;
  if (!userId) {
    res.status(200).send("Please provide userId");
    return;
  }
  try {
    await User.findOneAndDelete({ _id: userId });
    res.status(200).send("User Deleted Successfully");
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});
router.post("/statOfUser", adminVerifyToken, async (req, res) => {
  // console.log(req.body);
  const id = req.body.userID;
  // console.log(id);
  if (!id) {
    res.status(200).send("Please provide userId");
    return;
  }
  let totalPosts = 0;
  let data = null;
  try {
    const Posts = await Post.find({ userId: id });
    if (!Posts || Posts.length === 0) {
      res.status(200).send("No posts found");
      return;
    }
    totalPosts = Posts.length;
    let lastDate = null;
    // Now we are sure Posts is not empty
    if (totalPosts > 0) {
      lastDate = new Date(Posts[totalPosts - 1].date).toLocaleDateString(
        "en-US"
      );
      data = {
        totalPosts: totalPosts,
        lastDate: lastDate,
      };
    } else {
      data = {
        totalPosts: 0,
        lastDate: null,
      };
    }
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});
export default router;
