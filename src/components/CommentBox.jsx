import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/config";
import { Icon } from 'react-icons-kit'
import {bin} from 'react-icons-kit/icomoon/bin'
import { Button } from "react-bootstrap";

function CommentBox(props) {
  const { eachComment, comments } = props;
  const { user, isLoggedIn } = useContext(AuthContext);

  const handleDeleteComment = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken && isLoggedIn && user.isAdmin === true) {
        await service.delete(`/comments/${eachComment._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        console.log("borrando comentario");
        console.log(comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comment-box">
      <img src={eachComment.user.image} alt={eachComment.user.username} />
      <div className="comment-info">
        <h3>{eachComment.user.username}</h3>
        <p>{eachComment.text}</p>
      </div>

      {user && user.isAdmin === true ? (
        <div id="delete-comment-box">
          <Button variant="outline-danger" id="delete-comment-btn" onClick={handleDeleteComment}><Icon icon={bin} size={10}/> <br />Delete</Button>
        </div>
      ) : null}
    </div>
  );
}

export default CommentBox;
