import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import { Button } from "@material-ui/core";
import firebase from "firebase";

function Post({ postId, username, imageUrl, caption, user }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>
      <img className="post__image" src={imageUrl} alt="" />
      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>
      {comments.length != 0 && (
        <div className="post__comments">
          {comments.map((comment) => (
            <p className="post__comment_p">
              <strong>{comment.username} </strong>
              {comment.text}
            </p>
          ))}
        </div>
      )}
      {user && (
        <form className="post__commentbox">
          <input
            className="post__input"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            type="text"
          ></input>
          <Button
            color="primary"
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </Button>
        </form>
      )}
    </div>
  );
}

export default Post;
