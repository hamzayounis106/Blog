import { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextInput, Label, FileInput } from "flowbite-react";
import AccessDenied from "../Components/AccessDenied";
import LeftBottomPopUp from "../Components/LeftBottomPopUp";
function EditProfile() {
  const [profileData, setProfileData] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);
  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [popup, setPopup] = useState(null);
  const [alert, setAlert] = useState(null);
  const closepopup = () => {
    setTimeout(() => {
      setPopup(null);
      setAlert(null);
    }, 2000);
  };
  useEffect(() => {
    axios
      .get("/api/user/profile")
      .then((res) => {
        if (res.status === 200) {
          setProfileData(res.data);
          setUpdatedData(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
useEffect(() => {
}, [profileData]);
  const handleLogOut = async () => {
    await axios.get("/api/auth/logout");
    window.location.href = "/login";
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    if (updatedData.name === "" && updatedData.email === "") {
      setPopup("yellow");
      setAlert("No changes detected");
      closepopup();
      return;
    }
    if (
      updatedData.name === profileData.name &&
      updatedData.email === profileData.email &&
      newProfilePicture === null
    ) {
      setPopup("yellow");
      setAlert("No changes detected");
      closepopup();
      // alert("No changes detected");
      return;
    }
    const formData = new FormData();
    if (updatedData.name !== profileData.name) {
      formData.append("name", updatedData.name);
    }
    if (updatedData.email !== profileData.email) {
      formData.append("email", updatedData.email);
    }
    if (newProfilePicture) {
      formData.append("profilePicture", newProfilePicture);
    }

    console.log(formData);
    try {
      const response = await axios.post("/api/user/updateProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        if (response.data.email !== profileData.email) {
          setPopup("green");
          setAlert(
            "Email updated successfully, Please login again with new email"
          );
          closepopup();
          // alert("Please login again with new email");
          handleLogOut();
        } else {
          setProfileData(response.data);
          setPopup("green");
          setAlert("Profile Updated!");
          closepopup();
          // window.location.reload();
        }
        console.log(response.data);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
      setPopup("red");
      setAlert("Failed to update profile");
      closepopup();
      // alert("Failed to update profile");
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (currentPassword === "" || newPassword === "") {
      setPopup("yellow");
      setAlert("Please enter both current and new password");
      closepopup();
      // alert("Please enter both current and new password");
      return;
    }
    if (currentPassword === newPassword) {
      setPopup("yellow");
      setAlert("current and new password cannot be same");
      closepopup();
      // alert("current and new password cannot be same");
      return;
    }
    try {
      const res = await axios.post("/api/auth/updatePassword", {
        currentPassword,
        newPassword,
      });
      if (res.status === 200) {
        setPopup("green");
        setAlert("Password updated successfully");
        closepopup();
        // alert("Password updated successfully");
        handleLogOut();
      }
    } catch (error) {
      setPopup("red");
      setAlert(error.response.data);
      closepopup();
      // alert(error.response.data);
    }
  };
  return (
    <div className="container p-4 pt-6 mx-auto md:p-6 lg:p-12">
      {popup && (
        <LeftBottomPopUp
          text={alert}
          state={popup}
          onClose={() => setPopup(null)}
        />
      )}

      {profileData && (
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full p-4 xl:w-1/2">
            <div className="p-4 bg-white rounded ">
              <h2 className="mb-4 text-3xl font-semibold">Update Profile</h2>
              <form onSubmit={handleEditProfile}>
                <div className="flex flex-row flex-wrap items-center w-full mx-4 mb-4 justify-stretch">
                  <div className="w-full p-4 xl:w-[30%] -ml-9">
                    <img
                      src={profileData.profilePicture}
                      alt="Profile Picture"
                      className="object-cover w-24 h-24 rounded-full"
                    />
                  </div>
                  <div className="p-4 w-max ">
                    <FileInput
                      id="profilePicture"
                      label="Update Profile Picture"
                      onChange={(e) => {
                        setNewProfilePicture(e.target.files[0]);
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Label>Name</Label>
                  <TextInput
                    placeholder="Enter your name"
                    id="name"
                    value={updatedData.name}
                    onChange={(e) => {
                      setUpdatedData({ ...updatedData, name: e.target.value });
                    }}
                    className="w-full"
                  />
                </div>
                <div className="mb-4">
                  <Label>Email</Label>
                  <TextInput
                    placeholder="Enter your email"
                    id="email"
                    value={updatedData.email}
                    onChange={(e) => {
                      setUpdatedData({ ...updatedData, email: e.target.value });
                    }}
                    className="w-full"
                  />
                </div>
                <Button
                  type="submit"
                  className="mt-4 text-white transition-all duration-200 ease-in-out border-2 rounded-md disabled:cursor-not-allowed disabled:bg-white disabled:text-zinc-500 disabled:border-zinc-950 bg-[#131D32] hover:bg-zinc-800 w-fit"
                >
                  Save Changes
                </Button>
              </form>
            </div>
          </div>
          <div className="w-full p-4 xl:w-1/2">
            <div className="p-4 bg-white rounded ">
              <h2 className="mb-10 text-3xl font-semibold ">Update Password</h2>
              <form onSubmit={handlePasswordUpdate}>
                <div className="mb-4">
                  <Label>Current Password</Label>
                  <TextInput
                    placeholder="Enter your current password"
                    id="password"
                    onChange={(e) => setcurrentPassword(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="mb-4">
                  <Label>New Password</Label>
                  <TextInput
                    placeholder="Enter your new password"
                    id="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button
                  type="submit"
                  className="mt-4 text-white transition-all duration-200 ease-in-out border-2 rounded-md disabled:cursor-not-allowed disabled:bg-white disabled:text-zinc-500 disabled:border-zinc-950 bg-[#131D32] hover:bg-zinc-800 w-fit"
                >
                  Update Password
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
