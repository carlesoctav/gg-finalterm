import axios from "axios";
const baseUrlLogin = "http://localhost:3001/api/login";
const baseUrlSignup = "http://localhost:3001/api/users";

const login = async (credentials) => {
  try {
    const request = await axios.post(baseUrlLogin, credentials);
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

const signup = async (credentials) => {
  const request = await axios.post(baseUrl, credentials);
  return request.data;
};

const loginService = {
  login,
  signup,
};

export default loginService;
