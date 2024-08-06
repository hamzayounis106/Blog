import { Route, Routes, useLocation } from "react-router-dom";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import "flowbite";
import "flowbite/dist/flowbite.min.css";
import axios from "axios";

import Admin from "./Pages/Admin";
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
  // Assuming you have a function to get the token from cookies
  // function getAuthToken() {
  //   const cookies = document.cookie.split('; ');
  //   const authTokenCookie = cookies.find(row => row.startsWith('auth_token='));
  //   return authTokenCookie ? decodeURIComponent(authTokenCookie.split('=')[1]) : null;
  // }

  // const authToken = getAuthToken();
  // if (authToken) {
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  // }
  const location = useLocation();
  const showHeader = location.pathname.includes("admin") ? false : true;
  const showFooter = location.pathname.includes("admin") ? false : true;

  return (
    <>
      {showHeader && <Header />}
   

      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/saved-posts" element={<SavedPosts />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/admin/posts" element={<Admin view="posts" />} />
        <Route path="/admin/users" element={<Admin view="users" />} />
        <Route path="/admin/editProfile" element={<Admin view="editProfile" />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}

export default App;
