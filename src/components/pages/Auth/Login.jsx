import { useState, useEffect } from "react";
import loginService from "../../../services/login";
import { useNavigate } from "react-router-dom";
import videoService from "../../../services/video";
import Navbar from "../../Navbar";

const Login = ({ user, setUser }) => {
  console.log("🚀 ~ file: Login.jsx:6 ~ Login ~ user:", user);

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 ~ file: Login.jsx:14 ~ handleSubmit ~ login:", login);
    const response = await loginService.login(login);

    if (response.status === 200) {
      window.localStorage.setItem("loggedUser", JSON.stringify(response));
      setUser(response.data);
      videoService.setToken(response.data.token);
      navigate("/");
    }

    if (response.status === 401) {
      setLogin({ username: "", password: "" });
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
                  <a href="#" className="label-text-alt link link-hover">
                    don't have an account? sign up
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
