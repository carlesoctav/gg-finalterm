import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Home from "./components/pages/Home/Home";
import Details from "./components/pages/Details/Details";
import Login from "./components/pages/Auth/Login";
import Logout from "./components/pages/Auth/Logout";
import Populate from "./components/pages/Populate/Populate";
import videoService from "./services/video";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./style.css";
import Signup from "./components/pages/Auth/Signup";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

// const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user.data);
      videoService.setToken(user.data.token);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Home user={user} setUser={setUser} />} />
            <Route
              path="/details/:id"
              element={<Details user={user} setUser={setUser} />}
            />
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/" />
                ) : (
                  <Login user={user} setUser={setUser} />
                )
              }
            />
            <Route
              path="/logout"
              element={<Logout user={user} setUser={setUser} />}
            />
            <Route
              path="/populate"
              element={<Populate user={user} setUser={setUser} />}
            />
            <Route
              path="/signup"
              element={
                user ? (
                  <Navigate to="/" />
                ) : (
                  <Signup user={user} setUser={setUser} />
                )
              }
            />
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
