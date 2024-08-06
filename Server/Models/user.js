import mongoose from "mongoose";

const Userscheeme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "/user-6-line.svg",
  },
  gender: {
    type: String,
    default: "",
  },
  savedPosts: {
    type: [String],
    default: [],
  },
});

const User = mongoose.model("User", Userscheeme);
export default User;
