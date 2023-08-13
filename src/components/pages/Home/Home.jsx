import { useQuery } from "@tanstack/react-query";
import videoService from "../../../services/video";
import "./home.css";
import { Link } from "react-router-dom";
import Navbar from "../../Navbar";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/details/${video.id}`}>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={video.thumbnail} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{video.title}</h2>
        </div>
      </div>
    </Link>
  );
};

const VideoList = () => {
  const {
    data: videos,
    isLoading,
    error,
  } = useQuery(["videos"], videoService.getAllVideos);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      style={{ padding: "1rem" }}
    >
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

const Home = ({ user, setUser }) => {
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <VideoList />
    </>
  );
};

export default Home;
