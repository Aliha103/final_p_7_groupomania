import React, { useState, useEffect } from "react";
import "./feedPost.css";
import { useNavigate } from "react-router-dom"; // Use useNavigate from React Router

const FeedComponent = () => {
  const [feedPosts, setFeedPosts] = useState([]);
  const [newPostText, setNewPostText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const apiBaseUrl = "http://localhost:8000/api/posts";
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const fetchFeedPosts = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}`);
      if (!response.ok) {
        console.error(`Error fetching feed posts: ${response.statusText}`);
        return;
      }
      const data = await response.json();
      setFeedPosts(data);
    } catch (error) {
      console.error("Error fetching feed posts:", error);
    }
  };

  useEffect(() => {
    fetchFeedPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("text", newPostText);
      formData.append("image", selectedFile);

      const response = await fetch(`${apiBaseUrl}/createPost`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        fetchFeedPosts();
        setNewPostText("");
        setSelectedFile(null);
        navigate("/home");
        window.location.reload();
      } else {
        console.error("Failed to post:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting:", error);
    } finally {
      // Programmatically navigate to "/home" using React Router v6
      navigate("/home");
    }
  };

  return (
    <div className="feed">
      <div className="own_profile"></div>
      <form onSubmit={handlePostSubmit}>
        <input
          className="text_feedPost"
          type="text"
          placeholder="What's on your mind?"
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
        />
        <div className="feedPost_image_buttons">
          <div className="feedPost_image">
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <i className="fas fa-image"></i>
          </div>
          <div className="feedPost_buttons">
            <button type="submit" className="btn btn-primary">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FeedComponent;
