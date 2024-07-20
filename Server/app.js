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
const app = express();

// mongoose.connect("");

mongoose.connect(process.env.MONGO_URI);
app.use(express.json({ limit: "0.5mb" }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "500mb" }));
app.use(function (req, res, next) {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader("Access-Control-Max-Age", "1800");
  // res.setHeader("Access-Control-Allow-Headers", "content-type");
  // res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
  // next();
});
app.use(cors());
// app.use(
//   cors({
//     origin: [
//       // "https://gupshup-client-one.vercel.app",
//       "https://blog-client-bice.vercel.app",
//       // "http://localhost:5173",
//     ],
//     credentials: true,
//   })
// );
app.use(
  cors({
    credentials: true,
    origin: "https://blog-client-bice.vercel.app",
  })
);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("You should not come here :)");
});
