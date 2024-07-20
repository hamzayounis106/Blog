import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  excrept: {
    type: String,
    required: true,
  },
  userProfileImage:{
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: [String],
  },
  imageUrl: {
    type: String,
  },
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;
