import React, { useState, useEffect } from "react";
import Comment from "./Comments";

function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem("comments"));

    if (
      savedComments &&
      Array.isArray(savedComments) &&
      savedComments.length > 0
    ) {
      setComments(savedComments);
    } else {
      setComments([
        {
          text: "Top-level Comment",
          childComments: []
        }
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  return (
    <div>
      <h1>Hierarchical Comments</h1>
      {comments.map((comment, index) => (
        <Comment
          key={index}
          comment={comment}
          onReply={(newComment) => {
            const updatedComments = [...comments];
            updatedComments[index].childComments.push(newComment);
            setComments(updatedComments);
          }}
        />
      ))}
    </div>
  );
}

export default App;
