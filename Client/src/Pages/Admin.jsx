import axios from "axios";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import AdminPostCard from "../Components/AdminPostCard";
import AdminLogin from "../Components/AdminLogin";
import AdminUserCardTableView from "../Components/AdminUserCardTableView";
import Sidebar from "../Components/Sidebar";
import UpdateAdminProfile from "../Components/UpdateAdminProfile";
function Admin(props) {
  const [checkAllowed, setCheckAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentView, setCurrentView] = useState(props.view || "posts");

  useEffect(() => {
    const getAuthStatus = async () => {
      try {
        const res = await axios.get(
          "https://blog-api-three-psi.vercel.app/admin/checkAuthAdmin",
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setCheckAllowed(true);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    getAuthStatus();
  }, []);

  useEffect(() => {
    if (checkAllowed) {
      const getAllPosts = async () => {
        const res = await axios.get(
          "https://blog-api-three-psi.vercel.app/admin/allPostsA",
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setPosts(res.data);
        }
        console.log(res.data);
      };
      const getAllUsers = async () => {
        const res = await axios.get(
          "https://blog-api-three-psi.vercel.app/admin/allUsersA",
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setUsers(res.data);
        }
        console.log(res.data);
      };
      if (currentView === "posts") {
        getAllPosts();
      }
      if (currentView === "users") {
      }
      getAllUsers();
      setLoading(false);
    }
  }, [checkAllowed, currentView]);

  const handlePostRemoval = (postId) => {
    setPosts(posts.filter((post) => post._id !== postId));
  };

  const handleUserRemoval = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleLogout = async () => {
    try {
      // const res = await axios.post("https://blog-api-three-psi.vercel.app/admin/adminLogout", {

      //   withCredentials: true,
      // });
      await axios.post(
        "https://blog-api-three-psi.vercel.app/auth/admin/adminLogout",
        {},
        { withCredentials: true }
      );
      console.log(res);
      setCheckAllowed(false);
      window.location.reload();
      // if (res.status === 200) {

      // }
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Audio
          height="80"
          width="80"
          radius="9"
          color="gray"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    );
  }

  if (!checkAllowed) {
    return <AdminLogin />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar setCurrentView={setCurrentView} handleLogout={handleLogout} />
      <div className="flex-1 p-4">
        {currentView === "posts" && posts.length > 0 && (
          <div>
            <div className="flex flex-wrap items-center justify-center gap-4 p-4">
              {posts.map((post) => (
                <AdminPostCard
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  picture={post.imageUrl}
                  postedBy={post.userName}
                  authorImage={post.userProfileImage}
                  excerpt={post.excrept}
                  saved={post.saved}
                  onPostRemove={handlePostRemoval}
                  className="w-full h-full"
                />
              ))}
            </div>
          </div>
        )}
        {currentView === "editProfile" && <UpdateAdminProfile />}
        {currentView === "users" && users.length > 0 && (
          <div>
            <div className="flex flex-wrap items-stretch justify-center gap-4 p-4">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg ">
                <thead className="py-10">
                  <tr className="py-10 bg-gray-100 text-gray-950">
                    <th className="p-3 font-medium">Profile Picture</th>
                    <th className="p-3 font-medium">Name</th>
                    <th className="p-3 font-medium">Email</th>
                    <th className="p-3 font-medium">Last Post</th>
                    <th className="p-3 font-medium">Total Posts</th>
                    <th className="p-3 font-medium">Remove </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <AdminUserCardTableView
                      userId={user._id}
                      userName={user.name}
                      userEmail={user.email}
                      userPicture={user.profilePicture}
                      onUserDeletion={handleUserRemoval}
                      className="w-full h-full"
                      key={user._id}
                    />
                  ))}
                </tbody>
              </table>
              {/* {users.map((user) => (
                <AdminUserCard
                  userId={user._id}
                  userName={user.name}
                  userEmail={user.email}
                  userPicture={user.profilePicture}
                  onUserDeletion={handleUserRemoval}
                  className="w-full h-full"
                  key={user._id}
                />
              ))} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
