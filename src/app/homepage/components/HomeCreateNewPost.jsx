import React, { useRef, useState, useEffect } from "react";
import "../styles/home-create-post.css";
import { TbPhotoPlus } from "react-icons/tb";
import compressImgPost from "./compressImgPost";
import { RiDeleteBack2Fill } from "react-icons/ri";

const HomeCreateNewPost = ({ token, setPosts, userAvaData, userName }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const imageFile = useRef(null);
  const fileInputRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [text, setText] = useState("");
  const [visibility, setVisibility] = useState("public");

  // Effect dùng để đưa ảnh về vị trí giữa màn hình khi preview
  const imageRef = useRef(null);
  useEffect(() => {
    if (selectedImage && imageRef.current) {
      imageRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedImage]);

  const handleAddPhoto = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const compressImg = await compressImgPost(file);

        if (compressImg.src) {
          imageFile.current = compressImg.file;
          setHasPhoto(true);
          setSelectedImage(compressImg.src);
        }
      } catch (e) {
        console.log(e);
      }
    } else return;
  };

  const handleRemoveImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // reset input file
    }
    setHasPhoto(false);
    setSelectedImage(null);
  };
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleVisibilityChange = (event) => {
    setVisibility(event.target.value);
  };

  const handleSubmitPost = async () => {
    if (!hasPhoto && !text.trim()) return;
    try {
      const formData = new FormData();
      formData.append("content", text);
      formData.append("visibility", visibility);

      if (hasPhoto) {
        formData.append("post-image", imageFile.current); // "post-image" là đúng theo multer.single('image')
      }

      const response = await fetch("http://localhost:4000/api/posts/create", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          id: localStorage.getItem("id"),
        },
        body: formData,
      });

      const result = await response.json();
      console.log("New post response:", result);
      if (response.ok) {
        alert("Post created successfully!");
        setText("");
        setSelectedImage(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        imageFile.current = null;
        const newPost = {
          id: result.id,
          content: result.content,
          image: result.image,
          created_at: result.created_at,
          visibility: result.visibility,
          user: {
            id: result.user_id,
            name: userName,
            avatar: userAvaData.src,
            ava_offsetX: userAvaData.rOffsetX,
            ava_offsetY: userAvaData.rOffsetY,
            ava_width: userAvaData.cropWidth,
          },
        };
        setVisibility(result.visibility);
        setPosts((prevPosts) => [newPost, ...prevPosts]);
      } else {
        alert(result.message || "Failed to create post.");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("An error occurred while creating the post.");
    }
  };

  return (
    <div className="w-full">
      <div className="myhome-create-post-modal">
        <div className="myhome-create-post-header">
          <span>Create a new post</span>
          {!(hasPhoto == false && text.trim() == "") && (
            <select
              className="myhome-create-post-select-visibility"
              value={visibility}
              onChange={handleVisibilityChange}
            >
              <option value="public">Public</option>
              <option value="friends">Friend</option>
              <option value="private">Only me</option>
            </select>
          )}
        </div>

        <textarea
          className="myhome-create-post-textarea"
          placeholder={
            !hasPhoto
              ? "What is on your mind?"
              : "Say somthing about this photo"
          }
          value={text}
          onChange={handleTextChange}
        ></textarea>
        {selectedImage && (
          <div
            ref={imageRef}
            className="myhome-create-post-preview-image-wrapper"
          >
            <img
              src={selectedImage}
              alt="Selected"
              className="myhome-create-post-preview-image"
            />
            <button
              className="myhome-create-post-btn-delete-preview"
              onClick={handleRemoveImage}
            >
              <RiDeleteBack2Fill />
            </button>
          </div>
        )}
        <div className="myhome-create-post-group-button">
          <button
            className="myhome-create-post-btn-add-image"
            onClick={handleAddPhoto}
          >
            <TbPhotoPlus className="add-photo-icon" style={{ scale: "1.5" }} />
          </button>
          <button
            className="myhome-submit-post-button"
            style={{
              backgroundColor:
                hasPhoto == false && text.trim() == ""
                  ? "#e4e6eb"
                  : "rgb(55, 168, 102)",
              cursor:
                hasPhoto == false && text.trim() == "" ? "not-allowed" : "auto",
              color: hasPhoto == false && text.trim() == "" ? "#666" : "white",
            }}
            onClick={handleSubmitPost}
          >
            Create Post
          </button>
        </div>
      </div>
      {/* Input file ẩn */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default HomeCreateNewPost;
