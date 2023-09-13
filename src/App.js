import React, { useState, useEffect } from "react";
import Comment from "./Comments";

function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem("comments"));

    if (savedComments && Array.isArray(savedComments) && savedComments.length > 0) {
      setComments(savedComments);
    } else if (!savedComments) {
      setComments([
        {
          text: "Top-level Comment",
          childComments: [],
        },
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
          comments={comment.childComments} // Pass childComments as comments prop
          setComments={(newChildComments) => {
            // Update the childComments array for the specific comment
            const updatedComments = [...comments];
            updatedComments[index].childComments = newChildComments;
            setComments(updatedComments);
          }}
        />
      ))}
    </div>
  );
}

export default App;
