import React, { lazy, Suspense, useContext, useEffect } from "react";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import axios from "axios";
import { Context, server } from "./main.jsx";
import { Toaster } from "react-hot-toast";

const Edit = lazy(() => import("./pages/Edit.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const AllUsers = lazy(() => import("./pages/AllUsers.jsx"));
const AllBlogs = lazy(() => import("./pages/AllBlogs.jsx"));
const MainLayout = lazy(() => import("./Layout/MainLayout.jsx"));
const Loader = lazy(() => import("./Layout/loader.jsx"));

const App = () => {
  const { setUser, setIsAuthenticated, setLoading } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/users/profile`, { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((err) => {
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, [setUser, setIsAuthenticated, setLoading]);
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/about" element={<About />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/allusers" element={<AllUsers />} />
              <Route path="/allblogs" element={<AllBlogs />} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Route>
          </Routes>
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
