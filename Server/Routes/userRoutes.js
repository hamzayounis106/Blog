import express from "express";
import User from "../Models/user.js";
import multer from "multer";
import env from "dotenv";
import Post from "../Models/Post.js";
// import Post from "../Models/Post.js";
env.config();

import cloudinary from "cloudinary";
import { verifyToken } from "../Middleware/authMiddleware.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
const router = express.Router();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
// Multer configuration with Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "blog_images",
    upload_preset: "BlogImages", // Specify the upload preset here
  },
});
router.get("/stats", verifyToken, async (req, res) => {
  const id = req.user.id;
  let totalPosts = 0;
  let data = null;
  try {
    const Posts = await Post.find({ userId: id });
    if (!Posts || Posts.length === 0) {
      res.status(400).send("No posts found");
      return;
    }
    totalPosts = Posts.length;
    let lastDate = null;
    // Now we are sure Posts is not empty
    if (totalPosts > 0) {
      lastDate = new Date(Posts[totalPosts - 1].date).toLocaleDateString("en-US");
      data = {
        totalPosts: totalPosts,
        lastDate: lastDate 
      };
    } else {
      data = {
        totalPosts: 0,
        lastDate: null
      };
    }
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});
const upload = multer({ storage: storage });
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

router.get("/CheckAuth", verifyToken, (req, res) => {
  res.status(200).send("Authorized");
});
router.get("/feedAuth", verifyToken, (req, res) => {
  res.status(200).send("Authorized");
});

router.post(
  "/addSavePost",
  verifyToken,

  async (req, res) => {
    const user = req.user;
    const email = user.email;
    try {
      // Find the user first to check the current state of savedPosts
      const user = await User.findOne({ email: email });

      if (user) {
        let update;
        // Check if the postId is already in the savedPosts array
        if (user.savedPosts.includes(req.body.postId)) {
          // If yes, prepare to remove it
          update = { $pull: { savedPosts: req.body.postId } };
        } else {
          // If not, prepare to add it
          update = { $push: { savedPosts: req.body.postId } };
        }

        // Perform the update based on the condition
        const updatedUser = await User.findOneAndUpdate(
          { email: email },
          update,
          { new: true }
        );
        res.status(200).send("saved");
        console.log(updatedUser);
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error(error);
    }
    console.log(user);
    console.log(req.body);
  }
);
router.post(
  "/updateProfile",
  verifyToken,
  upload.single("profilePicture"),
  async (req, res) => {
    const targetEmail = req.user.email;
    const name = req.body.name;
    const imageUrl = req.file ? req.file.path : null;
    const email = req.body.email;

    const data = {};
    if (imageUrl) {
      data.profilePicture = imageUrl;
    }
    if (name) {
      data.name = name;
    }
    if (email) {
      data.email = email;
    }
    // console.log(data);
    if (data) {
      try {
        const user = await User.findOneAndUpdate({ email: targetEmail }, data, {
          new: true,
        });
        res.status(200).send(user);
      } catch (error) {
        console.error(error);
        res.send("An error occurred");
      }
    }
    // console.log(data);
  }
);
export default router;
