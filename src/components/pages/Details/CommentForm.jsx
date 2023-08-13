import { useParams } from "react-router-dom";
import { useState } from "react";
import videoService from "../../../services/video";
import { Info, Success, Error, Warning } from "../../Notification";

const CommentForm = ({ user }) => {
  const { id } = useParams();

  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  const [comment, setComment] = useState("");

  if (!user) {
    return <button className="btn btn-wide">login to comment</button>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🚀 ~ file: Details.jsx:20 ~ handleSubmit ~ id:", id);
    console.log("🚀 ~ file: Details.jsx:20 ~ handleSubmit ~ comment:", comment);
    const request = await videoService.postCommentOfVideo({
      queryKey: ["details", id, comment],
    });
    console.log(
      "🚀 ~ file: CommentForm.jsx:22 ~ handleSubmit ~ request:",
      request
    );

    if (request.status === 201) {
      setComment("");

      setNotification({
        message: "Comment posted successfully",
        type: "success",
      });

      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
    }

    if (request.status === 400) {
      setNotification({
        message: request.data.error,
        type: "error",
      });

      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
    }
  };

  return (
    <div className="form-control w-full max-w-xs">
      <form onSubmit={handleSubmit}>
        <label className="label">
          <span className="label-text">{user.username}</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <input type="submit" hidden />
      </form>

      {notification.type === "success" && (
        <Success message={notification.message} />
      )}

      {notification.type === "error" && (
        <Error message={notification.message} />
      )}
    </div>
  );
};

export default CommentForm;
