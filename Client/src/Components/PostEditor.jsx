import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, TextInput, Label, FileInput } from "flowbite-react";
import "flowbite";
import "flowbite/dist/flowbite.min.css";
import axios from "axios";
import LeftBottomPopUp from "./LeftBottomPopUp";
const PostEditor = () => {
  const [postData, setPostData] = useState("");
  const [file, setFile] = useState(null);
  const [disable, setDisable] = useState(true);
  const [title, setTitle] = useState("");
  const [excrept, setExcrept] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null);
  const [alert, setAlert] = useState(null);

  const closepopup = () => {
    setTimeout(() => {
      setPopup(null);
      setAlert(null);
    }, 2000);
  };
  const handleSave = async (event) => {
    setLoading(true);
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    event.preventDefault();
    const formData = new FormData();
    formData.append("postData", postData);
    formData.append("title", title);
    formData.append("excrept", excrept);
    formData.append("file", file);
    try {
      const response = await axios.post("/api/post/savePost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        setLoading(false);
        document.body.style.overflow = "auto";
        const postId = response.data;
        console.log(postId);
        setTimeout(() => {
          setPopup("green");
          closepopup();
          window.location.href = `/post/${postId}`;
        }, 1000);
  
      }
    } catch (error) {
      setLoading(false);
      document.body.style.overflow = "auto";
      console.error(error);
      setTimeout(() => {
        setPopup("yellow");
        setAlert("Failed to save post");
        closepopup();
      }, 1000);
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }],
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "video"],
        ["clean"],
      ],
    },
  };

  return (
    <div className="container p-4 pt-6 mx-auto md:p-6 lg:p-12">
      {popup === "green" && (
        <LeftBottomPopUp
          text="Post Saved Successfully"
          state="green"
          onClose={() => setPopup(null)}
        />
      )}
      {popup === "yellow" && (
        <LeftBottomPopUp
          text={alert}
          state="yellow"
          onClose={() => setPopup(null)}
        />
      )}
      {loading && (
        <>
          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-[#0000002d] z-[1000]">
            <div className="loader"></div>
          </div>
        </>
      )}

      <h1 className="mb-4 text-3xl font-bold">Create a New Post</h1>
      <form onSubmit={handleSave} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="title"
            value="Post Title"
            className="text-lg font-bold"
          />
          <TextInput
            required
            placeholder="Enter post title..."
            id="title"
            maxLength={80}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="title"
            value="Excerpt"
            className="text-lg font-bold"
          />
          <TextInput
            required
            placeholder="Short description..."
            id="excrept"
            maxLength={80}
            onChange={(e) => setExcrept(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="featureImage"
            value="Feature Image"
            className="text-lg font-bold"
          />
          <FileInput
            id="featureImage"
            required
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                if (file.size <= 2 * 1024 * 1024) {
                  setFile(file);
                } else {
                  setPopup("yellow");
                  setAlert("File size should be under 2MB");
                  closepopup();
                  e.target.value = "";
                }
              }
            }}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="postContent"
            value="Post Content"
            className="text-lg font-bold"
          />
          <ReactQuill
            onChange={(content, delta, source, editor) => {
              setPostData(editor.getHTML());
              setDisable(false);
            }}
            content={postData}
            theme="snow"
            modules={modules}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "link",
              "image",
              "video",
            ]}
            placeholder="Write something amazing..."
            className="w-full h-64"
          />
        </div>
        {disable ? null : (
          <Button
            type="submit"
            className="mt-4 text-white transition-all duration-200 ease-in-out border-2 rounded-md disabled:cursor-not-allowed disabled:bg-white disabled:text-zinc-500 disabled:border-zinc-950 bg-[#131D32] hover:bg-zinc-800 w-fit"
          >
            Save Post
          </Button>
        )}
      </form>
    </div>
  );
};

export default PostEditor;
