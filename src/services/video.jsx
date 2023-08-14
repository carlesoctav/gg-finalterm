import axios from "axios";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAllVideos = async ({ queryKey }) => {
  const request = await axios.get("/api/videos");

  return request.data;
};

const getProductOfVideo = async ({ queryKey }) => {
  const id = queryKey[1];
  const request = await axios.get(`/api/videos/${id}/products`);

  return request.data;
};

const getCommentOfVideo = async ({ queryKey }) => {
  const id = queryKey[1];
  const request = await axios.get(`api/videos/${id}/comments`);

  return request.data;
};

const postCommentOfVideo = async ({ queryKey }) => {
  const id = queryKey[1];
  const comment = queryKey[2];

  const newComment = {
    videoId: id,
    comment: comment,
  };
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    const request = await axios.post(`/api/comments`, newComment, config);
    return {
      status: request.status,
      data: request.data,
    };
  } catch (error) {
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
};

const videoService = {
  getAllVideos,
  getProductOfVideo,
  getCommentOfVideo,
  postCommentOfVideo,
  setToken,
};

export default videoService;
