import React, { useContext, useEffect, useState } from "react";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { Context, server } from "../main";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { handleReload, ProfileCard, transformImage } from "../lib/features";
import moment from "moment";
const bg = "linear-gradient(147deg, #e85c64 0%, #f45671 50%, #ec5786 100%)";

const About = () => {
  const { isAuthenticated, user, loading, setLoading } = useContext(Context);
  const [name, setName] = useState(user?.name || "");
  const [age, setAge] = useState(user?.age || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profilePic, setProfilePic] = useState(user?.profilePic || "");
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  if (!isAuthenticated) return <Navigate to={"/login"} />;
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${server}/users/profile/update`,
        {
          name,
          age,
          bio,
          profilePic,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
      setLoading(false);
      handleReload();
      navigate("/about");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <Mui.Container
      maxWidth="xl"
      sx={{
        position: "fixed",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        top: "55%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        // border: '1px solid black',
      }}
    >
      <Mui.Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          width: "55vw",
          // border: '3px solid black',
          margin: "0",
        }}
      >
        <Mui.Paper
          elevation={6}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            // border : '1px solid black',
          }}
        >
          <Mui.Box
            sx={{
              width: "45%",
              // height: "100%",
              overflow: "hidden",
              // border: '2px solid black',
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "0",
            }}
          >
            {loading ? (
              <Mui.Skeleton
                animation="wave"
                variant="circular"
                width={250}
                height={250}
              />
            ) : (
              <Mui.Avatar
                src={transformImage(profilePic, 250)}
                sx={{
                  width: 250,
                  height: 250,
                  objectFit: "contain",
                  marginBottom: "1rem",
                  // border: "5px solid black",
                  // position: "absolute",
                }}
              />
            )}
            {loading ? (
              <Mui.Skeleton
                animation="wave"
                variant="rectangular"
                width={"100%"}
                height={50}
              />
            ) : (
              <Mui.Typography
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                component="div"
              >
                <MuiIcons.CameraAltOutlined
                  sx={{
                    color: "black",
                    // position: 'relative',
                  }}
                />
                <Mui.TextField
                  fullWidth
                  variant="standard"
                  type="text"
                  sx={{
                    marginLeft: "1rem",
                  }}
                  value={profilePic}
                  onChange={(e) => setProfilePic(e.target.value)}
                ></Mui.TextField>
              </Mui.Typography>
            )}
          </Mui.Box>
          {loading ? (
            <Mui.Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={"100%"}
            />
          ) : (
            <Mui.Box
              sx={{
                width: "55%",
                // height: "100%",
                overflow: "hidden",
                background: bg,
                // border: '2px solid red',
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "3rem",
                gap: "1rem",
              }}
            >
              <Mui.Typography
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                component="div"
              >
                Name:
                <Mui.TextField
                  fullWidth
                  variant="standard"
                  type="text"
                  sx={{
                    marginLeft: "1rem",
                  }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Mui.TextField>
              </Mui.Typography>
              <Mui.Typography
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                component="div"
              >
                Email:
                <Mui.TextField
                  fullWidth
                  variant="standard"
                  disabled
                  sx={{
                    marginLeft: "1rem",
                  }}
                  value={user.email}
                ></Mui.TextField>
              </Mui.Typography>
              <Mui.Typography
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                component="div"
              >
                Age:
                <Mui.TextField
                  fullWidth
                  variant="standard"
                  type="number"
                  value={age}
                  sx={{
                    marginLeft: "1rem",
                  }}
                  onChange={(e) => setAge(e.target.value)}
                ></Mui.TextField>
              </Mui.Typography>
              <Mui.Typography
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  background: "transparent",
                }}
                component="div"
              >
                Bio:
                <Mui.TextField
                  fullWidth
                  variant="standard"
                  type="text"
                  value={bio}
                  maxRows={4}
                  sx={{
                    marginLeft: "1rem",
                    background: "transparent",
                  }}
                  onChange={(e) => setBio(e.target.value)}
                ></Mui.TextField>
              </Mui.Typography>
              {/* <Mui.Typography
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                // display: "block",
              }}
              component="div" 
            >
              Joined On
              <Mui.TextField
                fullWidth
                disabled
                variant="standard"
                placeholder={user.createdAt}
                sx={{
                  marginLeft: "1rem",
                }}
              ></Mui.TextField>
            </Mui.Typography> */}

              <ProfileCard
                heading={"Joined"}
                text={moment(user?.createdAt).fromNow()}
                Icon={<MuiIcons.CalendarMonth />}
              />
              <Mui.Button
                variant="outlined"
                sx={{
                  marginTop: "1rem",
                  background: "transparent",
                  color: "white",
                  borderRadius: "1.2rem",
                  borderColor: "white",
                  width: "12rem",
                  "&:hover": {
                    background: "transparent",
                  },
                  // display: 'flex',
                  // justifyContent: 'center',
                  right: "0",
                }}
                onClick={updateProfile}
              >
                <Mui.Typography
                  variant="h6"
                  sx={{
                    fontSize: ".8rem",
                  }}
                >
                  Update Profile
                </Mui.Typography>
              </Mui.Button>
            </Mui.Box>
          )}
        </Mui.Paper>
      </Mui.Box>
    </Mui.Container>
  );
};

export default About;
