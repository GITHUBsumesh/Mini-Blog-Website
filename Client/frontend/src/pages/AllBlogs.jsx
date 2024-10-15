import React, {
  Fragment,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { Context, server } from "../main";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BlogList } from "../lib/features";
const bg = "linear-gradient(147deg, #e85c64 0%, #f45671 50%, #ec5786 100%)";
const AllBlogs = () => {
  const { isAuthenticated, setLoading } = useContext(Context);
  const [blogs, setBlogs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLocalLoading] = useState(true);
  const containerRef = useRef(null);
  const scrollPositionRef = useRef(0);
  useEffect(() => {
    setLocalLoading(true);
    axios
      .get(`${server}/blog/all`, { withCredentials: true })
      .then((res) => {
        // console.log(res.data.blogs);

        setBlogs(res.data.blogs);
        setLocalLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLocalLoading(false);
      });
  }, [refresh]);
  const likeHandler = async (id) => {
    // setLike((prev) => prev + 1);
    try {
      scrollPositionRef.current = containerRef.current.scrollTop;
      setLoading(true);
      await axios
        .put(
          `${server}/blog/like/${id}`,
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          // console.log(res.data.message);
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          // console.log(err);
        });
      setRefresh((prev) => !prev);
      setLoading(false);
    } catch (error) {
      toast.error(err.response.data.message);

      // console.log(error);
      setLoading(false);
    }
  };
  useLayoutEffect(() => {
    // Restore the scroll position after re-render
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollPositionRef.current;
    }
  }, [blogs]);
  if (!isAuthenticated) return <Navigate to={"/login"} />;
  return (
    <Mui.Container
      maxWidth="xl"
      sx={{
        position: "fixed",
        // height: "100vh",
        width: "100vw",
        gap: "0",
        // border: "13px solid black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Mui.Box
        sx={{
          // border: "1px solid black",
          marginBottom: ".5rem",
          padding: "0",
        }}
      >
        <Mui.Typography
          variant="h5"
          sx={{
            color: "black",
            textAlign: "center",
            // paddingTop: "0.5rem",
            fontFamily: "cursive",
            margin: "0",
            top: "0",
          }}
        >
          All Blogs
        </Mui.Typography>
      </Mui.Box>
      <Mui.Box
        sx={{
          //   border: "1px solid black",
          height: "90vh",
          width: "60%",
        }}
      >
        <Mui.Paper
          elevation={6}
          sx={{
            padding: "1.5rem",
            width: "100%",
            height: "100%",
          }}
        >
          <Mui.Stack
            ref={containerRef}
            height={"95%"}
            direction={"column"}
            sx={{
              width: "100%",
              gap: "1rem",
              paddingBottom: "0.5rem",
              overflowY: "auto",
              overflowX: "hidden",
              "&::-webkit-scrollbar": {
                display: "none", // Hides the scrollbar for Webkit browsers
              },
            }}
          >
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <Mui.Box key={index} sx={{ width: "100%" }}>
                    <Mui.Skeleton
                      variant="rectangular"
                      height={150}
                      sx={{ borderRadius: "8px", marginBottom: "1rem" }}
                    />
                  </Mui.Box>
                ))
              : blogs
                  .slice()
                  .reverse()
                  .map((blog) => (
                    <BlogList
                      blog={blog}
                      id={blog._id}
                      key={blog._id}
                      likeHandler={likeHandler}
                    />
                  ))}
          </Mui.Stack>
        </Mui.Paper>
      </Mui.Box>
    </Mui.Container>
  );
};

export default AllBlogs;
