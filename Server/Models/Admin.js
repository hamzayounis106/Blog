import mongoose from "mongoose";
const adminScheema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminScheema);
export default Admin;
