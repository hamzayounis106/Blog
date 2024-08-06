import env from 'dotenv';
env.config();

import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import jwt from "jsonwebtoken";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Post from "../Models/Post.js";
import {adminVerifyToken} from "../Middleware/adminAuthMiddleware.js";
import { verifyToken } from "../Middleware/authMiddleware.js";
import User from "../Models/user.js";
const router = express.Router();
const secretKey = process.env.SECRET_KEY;
// Cloudinary configuration
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

const upload = multer({ storage: storage });

router.post(
  "/savePost",
  verifyToken,
  upload.single("file"),
  async (req, res) => {
    try {
      const { postData, title } = req.body;
      const imageUrl = req.file ? req.file.path : "";
      const user = await User.findById(req.user.id);
      const post = await Post.create({
        userId: req.user.id,
        userName: user.name,
        userProfileImage: user.profilePicture,
        title,
        content: postData,
        imageUrl,
        excrept: req.body.excrept,
      });
      if (!post) {
        return res.status(400).send("Failed to save post");
      }
      res.status(200).send(post._id);
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to save post");
    }
  }
);

router.get("/getPosts", async (req, res) => {
  const token = req.cookies.auth_token;
  let savedPosts = [];
  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      if (decoded.id) {
        user = await User.findById(decoded.id);
        if (user) {
          savedPosts = await Post.find({ _id: { $in: user.savedPosts } });
          savedPosts = savedPosts.map((post) => ({
            ...post.toObject(),
            saved: true,
          }));
        }
      }
    } catch (error) {
      console.error("JWT verification or user retrieval failed:", error);
    }
  }

  try {
    let posts;
    if (savedPosts.length === 0) {
      posts = await Post.find().sort({ date: -1 });
    } else {
      posts = await Post.find({ _id: { $nin: user.savedPosts } });
      posts = savedPosts.concat(posts);
      posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    res.status(200).send(posts);
  } catch (error) {
    console.error("Post retrieval failed:", error);
    res.status(500).send("An error occurred");
  }
});
router.get("/getPost/:idt", async (req, res) => {
  console.log(req.params.idt);
  const postId = req.params.idt;
  try {
    const post = await Post.findById(postId);
    console.log(post);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.status(200).send(post);
  } catch (error) {
    console.error(error);
    return res.status(404).send("Error : " + error);
  }
});
router.get("/savedPosts", verifyToken, async (req, res) => {
  const email = req.user.email;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const savedPosts = user.savedPosts;
      if (savedPosts.length === 0) {
        return res.status(200).send(null);
      } else {
        let POSTS = await Post.find({ _id: { $in: savedPosts } });
        POSTS = POSTS.map((post) => ({
          ...post.toObject(),
          saved: true,
        }));
        return res.status(200).send(POSTS);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

router.get("/myposts", verifyToken, async (req, res) => {
  const id = req.user.id;
  try {
    const myPosts = await Post.find({ userId: id });
    if (myPosts.length === 0) {
      return res.status(200).send(null);
    } else {
      // console.log(myPosts);
      return res.status(200).send(myPosts);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});
router.post("/deletePost", verifyToken, async (req, res) => {
  const PostID = req.body.postId;
  try {
    const post = await Post.findById(PostID);
    console.log(post);
    if (post) {
      await Post.findByIdAndDelete(PostID);
      return res.status(200).send("Post Deleted Successfully");
    }
    return res.status(404).send("Post Not Found");
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred");
  }
});
router.post("/deletePostAdminC", adminVerifyToken, async (req, res) => {
  const PostID = req.body.postId;
  try {
    const post = await Post.findById(PostID);
    console.log(post);
    if (post) {
      await Post.findByIdAndDelete(PostID);
      return res.status(200).send("Post Deleted Successfully");
    }
    return res.status(404).send("Post Not Found");
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred");
  }
});

export default router;
