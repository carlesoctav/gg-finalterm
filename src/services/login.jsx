import axios from "axios";

const backend = import.meta.env.VITE_backend;
const baseUrlLogin = `${backend}/api/login`;
const baseUrlSignup = `${backend}/api/users`;

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
  try {
    const request = await axios.post(baseUrlSignup, credentials);
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

const loginService = {
  login,
  signup,
};

export default loginService;
