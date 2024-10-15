import React, { useContext, useEffect, useState } from "react";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import moment from "moment";
import IconBtn from "../components/IconBtn";
import { Context, server } from "../main";
import axios from "axios";
const features = () => {
  return <div>features</div>;
};

const transformImage = (url = "", width = 100) => {
  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);
  return newUrl;
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Mui.Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"black"}
    textAlign={"center"}
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {Icon && Icon}

    <Mui.Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Mui.Typography variant="body1">{text}</Mui.Typography>
      <Mui.Typography color={"black"} variant="caption">
        {heading}
      </Mui.Typography>
    </Mui.Stack>
  </Mui.Stack>
);

const bg = "linear-gradient(147deg, #e85c64 0%, #f45671 50%, #ec5786 100%)";

const UserCard = ({ user }) => {
  return (
    <Mui.Card
      elevation={6}
      sx={{
        // border: "1px solid black",
        background: bg,
        width: "19rem",
        height: "35rem",
        flex: "0 0 auto",
      }}
    >
      <Mui.CardMedia
        component="img"
        sx={{ height: 300 }}
        image={user.profilePic}
        title={user.profilePic}
      ></Mui.CardMedia>
      <Mui.CardContent>
        <Mui.Typography
          variant="h6"
          sx={{
            color: "white",
          }}
        >
          Name : {user.name}
        </Mui.Typography>
        <Mui.Typography
          variant="h6"
          sx={{
            color: "white",
          }}
        >
          Age : {user.age}
        </Mui.Typography>
        <Mui.Typography
          variant="h6"
          sx={{
            color: "white",
            // whiteSpace: "nowrap",
            overflow: "hidden", // Ensures the content doesn't overflow
            textOverflow: "ellipsis", // Adds "..." if text overflows
            display: "-webkit-box", // For multiline ellipsis
            WebkitLineClamp: 3, // Limits text to 3 lines
            WebkitBoxOrient: "vertical", // Required for -webkit-line-clamp
          }}
        >
          Bio : {user.bio}
        </Mui.Typography>
        <Mui.Typography
          variant="h6"
          sx={{
            color: "white",
          }}
        >
          Joined : {moment(user?.createdAt).fromNow()}
        </Mui.Typography>
      </Mui.CardContent>
    </Mui.Card>
  );
};

const handleReload = () => {
  window.location.reload(); // Reloads the current page
};

const BlogList = ({ blog, id, likeHandler }) => {
    const { isAuthenticated, user, loading, setLoading } = useContext(Context);
    const [userName, setUserName] = useState("");
    useEffect(()=>{
        setLoading(true);
        axios.get(`${server}/users/${blog.user}`, {withCredentials: true})
        .then((res)=>{

            setUserName(res.data.user.name);
            setLoading(false);
        })
    },[])
  return (
    <Mui.Paper
      elevation={3}
      sx={{
        padding: "1rem",
        paddingBottom: "1rem",
        marginTop: ".5rem",
        marginX: ".2rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Mui.Box>
      <Mui.Typography
          variant="h6"
          sx={{
            color: "blueviolet",
            fontSize: "1.25rem",
          }}
        >
          @{userName}
        </Mui.Typography>
        <Mui.Typography
          variant="h6"
          sx={{
            fontSize: "1.25rem",
          }}
        >
          {blog.title}
        </Mui.Typography>
        <Mui.Typography
          variant="body1"
          sx={{
            fontSize: ".9rem",
            overflow: "hidden", // Ensures the content doesn't overflow
            textOverflow: "ellipsis", // Adds "..." if text overflows
            display: "-webkit-box", // For multiline ellipsis
            WebkitLineClamp: 3, // Limits text to 3 lines
            WebkitBoxOrient: "vertical", // Required for -webkit-line-clamp
            whiteSpace: "pre-wrap",
          }}
        >
          {blog.content}
        </Mui.Typography>
      </Mui.Box>
      <Mui.Box
        sx={{
          // width: "100%",
          // display: "flex",
          // justifyContent: "space-between",
          // alignItems: "center",
          margin: "0",
          padding: "0",
          // border : '1px solid black',
        }}
      >
        <IconBtn
          title={"Like"}
          icon={<MuiIcons.ThumbUp sx={{ fontSize: 22 }} />}
          value={blog.likes.length}
          onClick={() => likeHandler(id)}
        />
      </Mui.Box>
    </Mui.Paper>
  );
};
export {
  features,
  transformImage,
  ProfileCard,
  UserCard,
  handleReload,
  BlogList,
};
