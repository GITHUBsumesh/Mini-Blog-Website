import React, { useContext, useEffect, useState } from "react";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { Context, server } from "../main";
import axios from "axios";
import moment from "moment";
import { handleReload, UserCard } from "../lib/features";
import { Navigate } from "react-router-dom";
const AllUsers = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading, user } =
    useContext(Context);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // handleReload();
    setLoading(true);
    axios
      .get(`${server}/users/allusers`, { withCredentials: true })
      .then((res) => {
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  //   useEffect(() => {handleReload()}, []);
  if (!isAuthenticated) return <Navigate to={"/login"} />;
  return (
    <Mui.Container
      maxWidth="xl"
      sx={{
        position: "fixed",
        // height: "100%",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "3px solid black",
        padding: "0",
        margin: "0",
        // background: "radial-gradient(circle, #55565b 0%, #414141 100%)",
      }}
    >
      <Mui.Box
        sx={{
          // border: "1px solid black",
          marginBottom: "1rem",
          padding: "0",
        }}
      >
        <Mui.Typography
          variant="h3"
          sx={{
            color: "black",
            textAlign: "center",
            // paddingTop: "0.5rem",
            fontFamily: "cursive",
            margin: "0",
            top: "0",
          }}
        >
          All Users
        </Mui.Typography>
      </Mui.Box>
      <Mui.Box
        maxWidth="xl"
        sx={{
          // border : '1px solid black',
          height: "80vh",
          width: "98vw",
          marginBottom: "1rem",
          //   overflowY: "scroll",
        }}
      >
        <Mui.Stack
          direction={"row"}
          sx={{
            width: "100%",
            gap: "1rem",
            overflowX: "auto", // Enables horizontal scrolling
            overflowY: "hidden", // Hides vertical scrolling
            // whiteSpace: "nowrap", // Prevents wrapping of child components
            "&::-webkit-scrollbar": {
              display: "none", // Hides the scrollbar for Webkit browsers
            },
          }}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Mui.Box key={index} sx={{ width: "100%" }}>
                  <Mui.Skeleton
                    variant="rectangular"
                    height={550}
                    sx={{ borderRadius: "8px", marginBottom: "1rem" }}
                  />
                </Mui.Box>
              ))
            : users.map((user) => <UserCard user={user} key={user._id} />)}
        </Mui.Stack>

        {/* <Mui.Card
          elevation={6}
          sx={{
            border: "1px solid black",
            background: "radial-gradient(circle, #55565b 0%, #414141 100%)",
            width: "19rem",
            height: "35rem",
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
        </Mui.Card> */}
      </Mui.Box>
    </Mui.Container>
  );
};

export default AllUsers;
