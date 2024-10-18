import React from 'react'

function CommentBox(props) {

  const {eachComment} = props
  return (
    <div>
      <p>{eachComment.text}</p>
      Comentario
    </div>
  )
}

export default CommentBox
