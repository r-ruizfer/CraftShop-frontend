import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/config";

function CommentBox(props) {
  const { eachComment, comments } = props;
  const { user, isLoggedIn } = useContext(AuthContext);

  const handleDeleteComment = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken && isLoggedIn && user.isAdmin === true) {
        await service.delete(`/comments/${eachComment._id}`, {headers: { Authorization: `Bearer ${storedToken}` }})
        console.log("borrando comentario")
        console.log(comments)
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      <p>{eachComment.text}</p>
      Comentario
      {user && user.isAdmin === true ? (
        <div className="admin-controls">
          <button onClick={handleDeleteComment}>Delete comment</button>
        </div>
      ) : null}
    </div>
  );
}

export default CommentBox;
