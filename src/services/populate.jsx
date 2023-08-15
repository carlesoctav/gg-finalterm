import axios from "axios";
const baseUrl = "http://localhost:3001/api/populates";

const populate = async (videoId) => {
  const config = {
    headers: {},
  };
  const body = {
    videoId: videoId,
  };

  try {
    const request = await axios.post(baseUrl, body, config);
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

const populateService = {
  populate,
};

export default populateService;
