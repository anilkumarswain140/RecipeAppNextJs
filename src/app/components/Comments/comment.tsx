"use client";
import { useState } from "react";
import { addComment } from "../../api/apiService"; // Assuming this function is defined in apiService
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@/app/contexts/ToastContext";
import Loader from "../Loading/Loader";

const Comments = ({ recipeId, initialComments }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(initialComments);
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    setIsLoading(true);

    if (comment.trim() === "") {
      alert("Comment cannot be empty");
      return;
    }

    try {
      const newComment = await addComment(recipeId, comment);
      setComments([...comments, newComment]);
      setComment("");
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting comment:", error);
      showToast("Error submitting comment:", "error");
    }
  };

  return (
    <div className="comments-section">
      {isLoading && <Loader loading={isLoading} />}
      <h3>Comments</h3>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index} className="comment" tabIndex={0}>
            <small>
              <FontAwesomeIcon icon={faUser} style={{ marginRight: "5px" }} />-{" "}
              {comment.author.username}{" "}
            </small>
            <p>{comment.content}</p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}

      <textarea
        tabIndex={0}
        value={comment}
        onChange={handleCommentChange}
        placeholder="Write your comment here..."
        rows={4}
        className="comment-box"
      />
      <button
        onClick={handleCommentSubmit}
        className="comment-btn"
        tabIndex={0}
      >
        Submit
      </button>
    </div>
  );
};

export default Comments;
