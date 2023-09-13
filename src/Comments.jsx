import React, { useState } from "react";

const Comment = ({ comment, comments, setComments }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplyClick = () => {
    setIsReplying(!isReplying);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim() !== "") {
      const newComment = { text: replyText, childComments: [] };

      // Update the childComments array for the current comment
      const updatedChildComments = [...comments, newComment];

      // Call the setComments function from the parent component
      setComments(updatedChildComments);

      // Clear replyText and setIsReplying here
      setReplyText("");
      setIsReplying(false);
    }
  };

  return (
    <div>
      <p>{comment.text}</p>
      <button onClick={handleReplyClick}>{isReplying ? "Cancel" : "Reply"}</button>
      {isReplying && (
        <form onSubmit={handleReplySubmit}>
          <input
            type="text"
            name="reply"
            id="reply"
            placeholder="Add a reply"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      )}
      <div style={{ marginLeft: "20px" }}>
        {comments.map((childComment, index) => (
          <Comment
            key={index}
            comment={childComment}
            comments={childComment.childComments}
            setComments={(newChildComments) => {
              // Update the childComments array for the current comment
              const updatedChildComments = [...comments];
              updatedChildComments[index].childComments = newChildComments;
              setComments(updatedChildComments);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
