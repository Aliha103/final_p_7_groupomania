import React, { useEffect, useState } from "react";
import "./comment.css";

function Comment({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const currentUser = {
    userId: localStorage.getItem("userId"),
    userName: `${localStorage.getItem("firstname")} ${localStorage.getItem(
      "lastname"
    )}`,
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/comments/post/${postId}`
      );
      const data = await res.json();

      if (Array.isArray(data.data)) {
        // Sort comments in descending order based on creation date
        const sortedComments = data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setComments(sortedComments);
      } else {
        console.error("Data is not an array:", data.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const addComment = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/comments/createComment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            text: newComment,
            postId: postId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      // Refetch comments after adding a new comment
      fetchComments();
      setNewComment(""); // Clear the input field
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      // Refetch comments after deleting a comment
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div>
      <div className="comment-section">
        <h3 className="comment-heading">Comments:</h3>
        {comments.map((comment) => (
          <div key={comment.id} className="comment-container">
            <p className="comment-user">
              {comment.firstname} {comment.lastname}
            </p>
            <p className="comment-content">{comment.content}</p>
            {currentUser.userId == comment.userId ||
            currentUser.userId == comment.postOwnerId ? (
              <button
                className="edit-comment-btn"
                onClick={() => deleteComment(comment.id)}
              >
                Delete Comment
              </button>
            ) : null}
          </div>
        ))}
      </div>

      <div className="add-comment-container">
        <input
          className="comment-input"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <button className="add-comment-btn" onClick={addComment}>
          Add Comment
        </button>
      </div>
    </div>
  );
}

export default Comment;
