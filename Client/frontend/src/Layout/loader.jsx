import React from "react";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
const loader = () => {
  return (
    <>
      <Mui.Box>
        <Mui.Skeleton variant="rectangular" width={"100%"} height={"64px"} />
      </Mui.Box>
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
          //   border: "10px solid black",
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
          <Mui.Skeleton variant="rectangular" height={"100%"} width={"100%"} />
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
          <Mui.Skeleton variant="rectangular" height={"100%"} width={"100%"} />
        </Mui.Box>
      </Mui.Container>
    </>
  );
};

export default loader;
