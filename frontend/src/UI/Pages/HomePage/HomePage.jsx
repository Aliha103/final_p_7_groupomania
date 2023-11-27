import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import FeedPost from "../../Components/feedPost/feedPost";
import Comments from "../../Components/Comment/comment";
import "./HomePage.css";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/posts");
      const data = await res.json();

      if (Array.isArray(data.data)) {
        const sortedPosts = data.data.sort((a, b) => b.id - a.id);
        setPosts(sortedPosts);
      } else {
        console.error("Data is not an array:", data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(
        "There was an error loading the posts. Please try again. Server response: " +
          error.message
      );
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/posts/${postId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    setCurrentUser({
      userName: `${localStorage.getItem("firstname")} ${localStorage.getItem(
        "lastname"
      )}`,
    });
    fetchPosts();
  }, []);

  return (
    <div>
      <Header />
      <FeedPost />
      <div className="feedReel">
        {posts.map((post) => (
          <div className="perReel" key={post.id}>
            <div className="feedReelOwner">
              {post.userName}
              {currentUser && currentUser.userName === post.userName && (
                <div className="postOptions">
                  <div className="dropdownContent">
                    <button onClick={() => deletePost(post.id)}>Delete</button>
                  </div>
                </div>
              )}
            </div>
            <div className="feedReelItem">
              {post.content}
              {post.image && (
                <img
                  className="feedReelImage"
                  src={`${post.image}`}
                  alt="Post"
                />
              )}
              {/* Display comments for each post */}
              <Comments postId={post.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(HomePage);
