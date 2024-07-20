import { Route, Routes, useLocation } from "react-router-dom";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import "flowbite";
import "flowbite/dist/flowbite.min.css";

import Header from "./Components/Header";
import Post from "./Pages/Post";
import SavedPosts from "./Pages/SavedPosts";
import MyPosts from "./Pages/MyPosts";
import AboutUs from "./Pages/AboutUs";
import Feed from "./Pages/Feed";
import Login from "./Pages/Login";
import CreatePost from "./Pages/CreatePost";
import Footer from "./Components/Footer";
import EditProfile from "./Pages/EditProfile";
function App() {
  const location = useLocation();
  // const showHeader = location.pathname !== "/profile";

  return (
    <>
      {/* {showHeader && <Header />} */}
      <Header />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/saved-posts" element={<SavedPosts />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/about" element={<AboutUs />} />

        <Route path="/login" element={<Login />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
