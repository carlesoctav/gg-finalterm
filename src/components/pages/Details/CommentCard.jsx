const CommentCard = ({ comment }) => {
  return (
    <div className="chat chat-start">
      <div className="chat-header">{comment.user.username}</div>
      <div className="chat-bubble">{comment.comment}</div>
    </div>
  );
};

export default CommentCard;
