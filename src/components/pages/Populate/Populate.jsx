import Navbar from "../../Navbar";
import { useState } from "react";
import populateService from "../../../services/populate";
import { Info, Success, Error, Warning } from "../../Notification";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Populate = ({ user, setUser }) => {
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  const queryClient = useQueryClient();

  const newVideo = useMutation(populateService.populate, {
    onSuccess: () => {
      queryClient.invalidateQueries(["videos"]);
    },
  });

  const [videoId, setVideoId] = useState("gp8JOmHEfos");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    setNotification({
      message: "Adding video to database, it will take a while",
      type: "info",
    });
    const request = await newVideo.mutateAsync(videoId);
    if (request.status === 201) {
      setVideoId("");
      setNotification({
        message: "Video added successfully",
        type: "success",
      });

      setTimeout(() => {
        setNotification({ message: null, type: null });
        navigate("/");
      }, 1000);
    }

    if (request.status === 400) {
      setVideoId("");
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
    <div>
      <Navbar user={user} setUser={setUser} />

      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div>
            <h1 className="text-5xl font-bold">You can add your own video</h1>
            <p className="py-6">
              Given a YouTube ID (remember it's just an ID, not a whole link)
              that has a Tokopedia link on it, you can add it to the database
              and it will be shown on the main page using the form below.
            </p>
            <form onSubmit={handlesubmit}>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={videoId}
                onChange={(e) => setVideoId(e.target.value)}
              />
              <input type="submit" hidden />
            </form>
          </div>
        </div>
      </div>

      {notification.type === "success" && (
        <Success message={notification.message} />
      )}
      {notification.type === "error" && (
        <Error message={notification.message} />
      )}
      {notification.type === "info" && <Info message={notification.message} />}
      {notification.type === "warning" && (
        <Warning message={notification.message} />
      )}
      {notification.type === "info" && <Info message={notification.message} />}
    </div>
  );
};

export default Populate;
