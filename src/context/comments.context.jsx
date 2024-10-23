import React, { useContext, useState, useEffect, createContext } from "react";
import service from "../services/config";
import { AuthContext } from "../context/auth.context";

//comparte la data de productos a traves de la app
const CommentContext = createContext();

//wrapper que almacena la informacion

function CommentWrapper({ children }) {
  const [comments, setComments] = useState(null);
  const [commentText, setCommentText] = useState("");
  const { user, isLoggedIn } = useContext(AuthContext);

  /// CARGAR COMENTARIOS
  const loadComments = async (productId) => {
    try {
      const response = await service.get(`comments/products/${productId}`);
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //publicar un comentario

  const handleCommentTextChange = (evento) => {
    let value = evento.target.value;
    setCommentText(value);
  };

  const postComment = async (event, productId) => {
    event.preventDefault();
    const newComment = {
      text: commentText,
      user: user._id,
      product: productId,
    };
    try {
      const storedToken = localStorage.getItem("authToken");
      if (user && storedToken && isLoggedIn === true) {
        await service.post(`/comments/`, newComment, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setCommentText("");
        loadComments(productId);
      } else {
        console.log("usuario sin autentificación");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (eachComment, productId) => {
    try {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken && isLoggedIn && user.isAdmin === true) {
        await service.delete(`/comments/${eachComment._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        loadComments(productId);
        console.log("borrando comentario");
        console.log(comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        setComments,
        commentText,
        setCommentText,
        loadComments,
        handleCommentTextChange,
        postComment,
        handleDeleteComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export { CommentContext, CommentWrapper };
