import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import FeedPost from "../../Components/feedPost/feedPost";
import "./HomePage.css";

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/posts")
      .then((res) => res.json())
      .then((data) => {
        // Ensure that data.data is an array before setting the state
        if (Array.isArray(data.data)) {
          setPosts(data.data);
        } else {
          console.error("Data is not an array:", data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <FeedPost />
      <div className="feedReel">
        {/* Check if posts is an array before using map */}
        {Array.isArray(posts) &&
          posts.map((post) => (
            <div className="perReel" key={post.id}>
              <div className="feedReelOwner">{post.userName}</div>
              <div className="feedReelItem">
                {/* Render the content of each post */}
                {post.content}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HomePage;
