import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import FeedPost from "../../Components/feedPost/feedPost";
import "./HomePage.css";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({}); // To store comments for each post
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    console.log("Before fetch");
    fetch("http://localhost:8000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log("Data received:", data);
        // Ensure that data.data is an array before setting the state
        if (Array.isArray(data.data)) {
          // Sort posts in descending order based on post ID
          const sortedPosts = data.data.sort((a, b) => b.id - a.id);
          setPosts(sortedPosts);
          // Initialize empty comments for each post
          const initialComments = {};
          sortedPosts.forEach((post) => (initialComments[post.id] = []));
          setComments(initialComments);
        } else {
          console.error("Data is not an array:", data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert(
          "There was an error loading the posts. Please try again. Server response: " +
            error.message
        );
      });
  }, []);

  const handleLikeDislike = (postId, action) => {
    // Implement logic for handling likes/dislikes
    // You may need to update the backend API and the state accordingly
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = (postId) => {
    // Implement logic for adding a new comment
    // You may need to update the backend API and the state accordingly
    const updatedComments = { ...comments };
    updatedComments[postId].push(newComment);
    setComments(updatedComments);
    setNewComment(""); // Clear the input field after adding a comment
  };

  return (
    <div>
      <Header />
      <FeedPost />
      <div className="feedReel">
        {Array.isArray(posts) &&
          posts.map((post) => (
            <div className="perReel" key={post.id}>
              <div className="feedReelOwner">{post.userName}</div>
              <div className="feedReelItem">
                {post.content}
                {post.image && (
                  <img
                    className="feedReelImage"
                    src={`${post.image}`}
                    alt="Post"
                  />
                )}
              </div>
              <div className="interactionIcons">
                <span onClick={() => handleLikeDislike(post.id, "like")}>
                  Like
                </span>
                <span onClick={() => handleLikeDislike(post.id, "dislike")}>
                  Dislike
                </span>
                <span>Comments</span>
              </div>
              <div className="commentsSection">
                {comments[post.id] &&
                  comments[post.id].map((comment, index) => (
                    <div key={index}>{comment}</div>
                  ))}
                <input
                  type="text"
                  value={newComment}
                  onChange={handleCommentChange}
                  placeholder="Add a comment"
                />
                <button onClick={() => handleAddComment(post.id)}>
                  Add Comment
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HomePage;
