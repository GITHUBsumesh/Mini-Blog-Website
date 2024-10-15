import React, { useContext, useEffect } from "react";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import { handleReload, transformImage } from "../lib/features";
import IconBtn from "./IconBtn";
const bg = "linear-gradient(147deg, #e85c64 0%, #f45671 50%, #ec5786 100%)";
const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading, user } =
    useContext(Context);
  const navigate = useNavigate();

  // useEffect(() => {handleReload}, []);
  const seeAllUsers = () => {
    // console.log("All Users");
    // isAuthenticated
    navigate("/allusers");
    // : toast.error("You need to login first");
  };
  const seeAllBlogs = () => {
    // console.log("All Blogs");

    navigate("/allblogs");
    // toast.error("You need to login first");
  };
  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };
  const seeAbout = () => {
    console.log("About");
    // isAuthenticated
    navigate("/about");
    // : toast.error("You need to login first");
  };

  return (
    <>
      <Mui.Box
        position="sticky"
        sx={{
          width: "100%", // Ensure full width
          height: "64px", // Fixed navbar height
          background: bg,
        }}
      >
        <Mui.AppBar
          position="sticky"
          sx={{
            bgcolor: "inherit",
            color: "white",
          }}
        >
          <Mui.Toolbar
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "space-between" },
            }}
          >
            <Mui.Typography
              variant="h6"
              sx={{
                display: { xs: "block" },
              }}
            >
              {!isAuthenticated ? "MiniBlog" : user.name}
            </Mui.Typography>
            {isAuthenticated ? (
              <Mui.Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                }}
              >
                <IconBtn
                  title={"Home"}
                  icon={<MuiIcons.Home />}
                  onClick={() => navigate("/")}
                />

                <IconBtn
                  title={"Users"}
                  icon={<MuiIcons.SupervisedUserCircle />}
                  onClick={() => seeAllUsers()}
                />

                <IconBtn
                  title={"Blogs"}
                  icon={<MuiIcons.NoteAlt />}
                  onClick={() => seeAllBlogs()}
                />

                {/* <IconBtn
                title={"About"}
                icon={<MuiIcons.AbcOutlined />}
                onClick={()=>seeAbout()}
              /> */}
                <Mui.Tooltip title={"About"}>
                  <Mui.IconButton
                    color="inherit"
                    size="large"
                    onClick={() => seeAbout()}
                  >
                    <Mui.Avatar
                      src={transformImage(user?.profilePic, 25)}
                      sx={{
                        width: 25,
                        height: 25,
                        objectFit: "contain",
                        // marginTop: ".7rem",
                        // marginX: ".5rem",
                        // border: "5px solid black",
                        // position: "absolute",
                      }}
                    />
                  </Mui.IconButton>
                </Mui.Tooltip>
                <IconBtn
                  title={"LogOut"}
                  icon={<MuiIcons.Logout />}
                  onClick={() => logoutHandler()}
                  disabled={loading}
                />
              </Mui.Box>
            ) : (
              ""
            )}
          </Mui.Toolbar>
        </Mui.AppBar>
      </Mui.Box>
    </>
  );
};

export default Navbar;
