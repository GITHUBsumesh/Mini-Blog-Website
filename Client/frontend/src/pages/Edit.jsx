import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { Context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
const Edit = () => {
  const { id } = useLocation().state;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //   const [blogs, setBlogs] = useState([]);
  //   const [refresh, setRefresh] = useState(false);
  const { isAuthenticated, loading, setLoading } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/blog/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data.blog);
        setTitle(res.data.blog.title);
        setContent(res.data.blog.content);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${server}/blog/${id}`,
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
      setLoading(false);

      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Mui.Container
      maxWidth="xl"
      sx={
        {
          // border: "11px solid black",
        }
      }
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
            Edit Blog
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
              //   color="blueviolet"
              margin="normal"
              sx={{
                backgroundColor: "yellow",
                width: "10rem",
                height: "3rem",
                color: "white",
                marginTop: "1rem",
                "&:hover": {
                  backgroundColor: "darkorange", // Hover color
                },
              }}
            >
              <Mui.Typography>Edit</Mui.Typography>
            </Mui.Button>
          </form>
        </Mui.Paper>
      </Mui.Box>
    </Mui.Container>
  );
};

export default Edit;
