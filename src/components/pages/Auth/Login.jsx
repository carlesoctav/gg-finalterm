import { useState, useEffect } from "react";
import loginService from "../../../services/login";
import { useNavigate } from "react-router-dom";
import videoService from "../../../services/video";
import Navbar from "../../Navbar";
import { Info, Success, Error, Warning } from "../../Notification";
import { Link } from "react-router-dom";

const Login = ({ user, setUser }) => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginService.login(login);

    if (response.status === 200) {
      window.localStorage.setItem("loggedUser", JSON.stringify(response));
      setNotification({
        message: `Welcome Back ${response.data.username}`,
        type: "success",
      });

      setTimeout(() => {
        setNotification({ message: null, type: null });

        setUser(response.data);
        videoService.setToken(response.data.token);
      }, 1000);
    }

    if (response.status === 400) {
      setNotification({
        message: response.data.error,
        type: "error",
      });

      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
    }

    if (response.status === 401) {
      setLogin({ username: "", password: "" });
      setNotification({
        message: "Invalid username or password",
        type: "error",
      });

      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
    }
  };
  const handleLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <form onSubmit={handleSubmit}>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={login.username}
                  className="input input-bordered"
                  onChange={handleLoginChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={login.password}
                  onChange={handleLoginChange}
                  className="input input-bordered"
                />
                <label className="label">
                  <Link to="/signup" className="label-text-alt link link-hover">
                    don't have an account? sign up
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </div>
          </div>
        </div>
      </form>

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
    </div>
  );
};

export default Login;
