import axios from "axios";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  console.log("🚀 ~ file: video.jsx:8 ~ setToken ~ token:", token);
};

const getAllVideos = async ({ queryKey }) => {
  const request = await axios.get("http://localhost:3001/api/videos");

  return request.data;
};

const getProductOfVideo = async ({ queryKey }) => {
  const id = queryKey[1];
  const request = await axios.get(
    `http://localhost:3001/api/videos/${id}/products`
  );

  return request.data;
};

const getCommentOfVideo = async ({ queryKey }) => {
  const id = queryKey[1];
  console.log("🚀 ~ file: video.jsx:20 ~ getCommentOfVideo ~ id:", id);
  const request = await axios.get(
    `http://localhost:3001/api/videos/${id}/comments`
  );

  return request.data;
};

const postCommentOfVideo = async ({ queryKey }) => {
  const id = queryKey[1];
  const comment = queryKey[2];
  console.log(
    "🚀 ~ file: video.jsx:37 ~ postCommentOfVideo ~ comment:",
    comment
  );

  console.log("🚀 ~ file: video.jsx:36 ~ postCommentOfVideo ~ id:", id);
  console.log("🚀 ~ file: video.jsx:4 ~ token:", token);

  const newComment = {
    videoId: id,
    comment: comment,
  };
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const request = await axios.post(
    `http://localhost:3001/api/comments`,
    newComment,
    config
  );

  return {
    status: request.status,
    data: request.data,
  };
};

const videoService = {
  getAllVideos,
  getProductOfVideo,
  getCommentOfVideo,
  postCommentOfVideo,
  setToken,
};

export default videoService;
