import { useNavigate } from "react-router-dom";

const Logout = ({ user, setUser }) => {
  const navigate = useNavigate();
  window.localStorage.removeItem("loggedUser");
  setUser(null);
  navigate("/");
};

export default Logout;
