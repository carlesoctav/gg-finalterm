import { useState, useEffect } from "react";
import loginService from "../../../services/login";
import { useNavigate } from "react-router-dom";
import videoService from "../../../services/video";
import Navbar from "../../Navbar";
import { Info, Success, Error, Warning } from "../../Notification";

const Signup = ({ user, setUser }) => {
  const [signup, setSignup] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  const [signupErrors, setSignupErrors] = useState({
    name: null,
    username: null,
    password: null,
  });
  const navigate = useNavigate();

  const handleSignupChange = async (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const newError = {
      name: null,
      username: null,
      password: null,
    };

    if (!signup.name) {
      newError.name = "Name is required";
    }
    if (!signup.username) {
      newError.username = "Username is required";
    }

    if (!signup.password) {
      newError.password = "Password is required";
    }

    if (signup.username.includes(" ")) {
      newError.username = "Username cannot contain spaces";
    }
    if (signup.password.length < 8) {
      newError.password = "Password must be at least 8 characters";
    }

    if (newError.name || newError.username || newError.password) {
      setSignupErrors(newError);
      return;
    } else {
      setSignupErrors(newError);

      setNotification({
        message: "Signing up...",
        type: "info",
      });

      const response = await loginService.signup(signup);
      if (response.status === 201) {
        setNotification({
          message: `Welcome ${response.data.name}, use your new credentials to login`,
          type: "success",
        });
        setTimeout(() => {
          setNotification({ message: null, type: null });
          navigate("/login");
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
    }
  };

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <form onSubmit={handleSignup}>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Sign up Now!</h1>
              <p className="py-6">
                Join over 1 user (just the author, lol) who is already using
                this app to watch their favorite videos!
              </p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="name"
                    className="input input-bordered"
                    value={signup.name}
                    onChange={handleSignupChange}
                    name="name"
                  />

                  {signupErrors.name && (
                    <span className="text-xs text-error mt-1">
                      {signupErrors.name}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    placeholder="username"
                    className="input input-bordered"
                    name="username"
                    onChange={handleSignupChange}
                    value={signup.username}
                  />

                  {signupErrors.username && (
                    <span className="text-xs text-error mt-1">
                      {signupErrors.username}
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="password"
                    className="input input-bordered"
                    value={signup.password}
                    name="password"
                    onChange={handleSignupChange}
                  />

                  {signupErrors.password && (
                    <span className="text-xs text-error mt-1">
                      {signupErrors.password}
                    </span>
                  )}
                  <label className="label"></label>
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary">Sign up</button>
                </div>
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

export default Signup;
