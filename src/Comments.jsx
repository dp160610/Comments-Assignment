import { useState } from "react";

const Comment = ({ comment, onReply }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplyClick = () => {
    setIsReplying(!isReplying);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim() !== "") {
      const newComment = { text: replyText, childComments: [] };
      onReply(newComment);
      setReplyText("");
      setIsReplying(false);
    }
  };  

  return (
    <div>
      <p>{comment.text}</p>
      <button onClick={handleReplyClick}>
        {isReplying ? "Cancel" : "Reply"}
      </button>
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
        {comment.childComments.map((childComment, index) => (
          <Comment
            key={index}
            comment={childComment}
            onReply={(newComment) => {
              const updatedComments = [...comment.childComments];
              updatedComments[index].childComments.push(newComment);
              setReplyText("");
              setIsReplying(false);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
