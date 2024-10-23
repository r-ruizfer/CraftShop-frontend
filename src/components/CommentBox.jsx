import React from "react";
import { useContext } from "react";
import { CommentContext } from "../context/comments.context.jsx";
import { AuthContext } from "../context/auth.context";
import { Icon } from "react-icons-kit";
import { bin } from "react-icons-kit/icomoon/bin";
import { Button } from "react-bootstrap";

function CommentBox(props) {
  const { eachComment, productId } = props;
  const { user, isLoggedIn } = useContext(AuthContext);
  const {
    comments,
    setComments,
    commentText,
    setCommentText,
    loadComments,
    handleCommentTextChange,
    postComment,
    handleDeleteComment,
  } = useContext(CommentContext);

  return (
    <div className="comment-box">
      <img src={eachComment.user.image} alt={eachComment.user.username} />
      <div className="comment-info">
        <h3>{eachComment.user.username}</h3>
        <p>{eachComment.text}</p>
      </div>

      {user && user.isAdmin === true ? (
        <div id="delete-comment-box">
          <Button
            variant="outline-danger"
            id="delete-comment-btn"
            onClick={() => handleDeleteComment(eachComment, productId)}
          >
            <Icon icon={bin} size={10} /> <br />
            Delete
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default CommentBox;
