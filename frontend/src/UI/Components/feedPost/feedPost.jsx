import React, { useState, useEffect } from "react";

const FeedComponent = () => {
  const [feedPosts, setFeedPosts] = useState([]);
  const [newPostText, setNewPostText] = useState("");

  const fetchFeedPosts = async () => {
    try {
      const response = await fetch("http://localhost:8000/posts");
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
      const response = await fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        body: JSON.stringify({ text: newPostText }),
      });

      if (response.ok) {
        fetchFeedPosts();
        setNewPostText("");
      } else {
        console.error("Failed to post:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting:", error);
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
        <div className="feedPost_buttons">
          <button type="submit" className="btn btn-primary">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedComponent;
