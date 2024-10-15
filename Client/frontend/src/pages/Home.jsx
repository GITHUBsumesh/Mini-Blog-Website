import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import * as Mui from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { Context, server } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import BlogList from "../components/BlogList";
const Home = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated, loading, setLoading } = useContext(Context);
  const containerRef = useRef(null); // Ref for the scrollable container
  const scrollPositionRef = useRef(0); // Ref to store the scroll position
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/blog/new`,
        {
          title,
          content,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTitle("");
      setContent("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  const likeHandler = async (id) => {
    try {
      scrollPositionRef.current = containerRef.current.scrollTop;
      setLoading(true);
      await axios
        .put(
          `${server}/blog/like/${id}`,
          {},
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data.message);
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          console.log(err);
        });

      setRefresh((prev) => !prev);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
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
  const editHandler = (id) => {
    navigate("/edit", { state: { id } });
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/blog/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/blog/my`, { withCredentials: true })
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <>
      <Mui.Container
        maxWidth="xl"
        sx={{
          position: "fixed",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "100vh",
          width: "100vw",
          padding: "0",
          margin: "0",
          // border : '10px solid black',
        }}
      >
        <Mui.Box
          className="create-blog"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            height: "30rem",
            width: "40rem",
            margin: "1rem",
            position: "relative",
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
            <Mui.Typography
              variant="h5"
              sx={{
                fontSize: "1.65rem",
                color: "black",
                fontFamily: "Segoe UI",
              }}
            >
              Create Blog
            </Mui.Typography>
            <form onSubmit={handleSubmit}>
              <Mui.TextField
                label="Title"
                variant="outlined"
                required
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Mui.TextField
                label="Content"
                fullWidth
                required
                multiline
                rows={6}
                margin="normal"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Mui.Button
                disabled={loading}
                type="submit"
                variant="contained"
                color="primary"
                margin="normal"
                sx={{
                  width: "10rem",
                  height: "3rem",
                  color: "white",
                  marginTop: "1rem",
                }}
              >
                <Mui.Typography>Create</Mui.Typography>
              </Mui.Button>
            </form>
          </Mui.Paper>
        </Mui.Box>
        <Mui.Box
          className="recent-blogs"
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "1rem",
            width: "40rem",
            height: "88vh",
            // overflowY: "scroll",
            scrollbar: "hidden",
          }}
        >
          <Mui.Paper
            elevation={6}
            sx={{
              padding: "1.2rem",
              height: "100%",
              width: "100%",
            }}
          >
            <Mui.Typography
              variant="h5"
              sx={{
                fontSize: "1.65rem",
                color: "black",
                fontFamily: "Segoe UI",
              }}
            >
              Recent Blogs
            </Mui.Typography>
            <Mui.Stack
              ref={containerRef}
              height={"90%"}
              sx={{
                marginTop: ".7rem",
                // marginBottom : '0.7rem',
                paddingBottom: "0.5rem",
                overflowX: "hidden",
                overflowY: "auto",
                scrollbar: "hidden",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {loading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <Mui.Box key={index} sx={{ width: "100%" }}>
                      <Mui.Skeleton
                        variant="rectangular"
                        height={100}
                        sx={{ borderRadius: "8px", marginBottom: "1rem" }}
                      />
                    </Mui.Box>
                  ))
                : blogs
                    .slice()
                    .reverse()
                    .map((blog) => (
                      // console.log(blog),

                      <BlogList
                        title={blog.title}
                        content={blog.content}
                        id={blog._id}
                        key={blog._id}
                        editHandler={editHandler}
                        deleteHandler={deleteHandler}
                        likeHandler={likeHandler}
                        like={blog.likes.length}
                      />
                    ))}
            </Mui.Stack>
          </Mui.Paper>
        </Mui.Box>
      </Mui.Container>
    </>
  );
};

export default Home;
