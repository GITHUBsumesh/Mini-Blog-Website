import React, { useContext, useEffect, useRef, useState } from "react";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import IconBtn from "./IconBtn";
import { useNavigate } from "react-router-dom";
const DeletePreview = ({ id, deleteHandler, onCancel }) => {
  const previewRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (previewRef.current && !previewRef.current.contains(event.target)) {
        onCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCancel]);

  return (
    <Mui.Box
      ref={previewRef}
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        padding: "1rem",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Mui.Typography
        variant="h5"
        sx={{
          margin: "2rem",
        }}
      >
        Delete Blog?
      </Mui.Typography>
      <Mui.Box>
        <Mui.Button
          onClick={() => deleteHandler(id)}
          sx={{
            backgroundColor: "blue",
            color: "white",
            marginRight: "1rem",
            fontSize: "1rem",
            margin: "1rem",
            width: "5rem",
          }}
        >
          Yes
        </Mui.Button>
        <Mui.Button
          onClick={onCancel}
          sx={{
            backgroundColor: "red",
            color: "white",
            fontSize: "1rem",
            margin: "1rem",
            width: "5rem",
          }}
        >
          No
        </Mui.Button>
      </Mui.Box>
    </Mui.Box>
  );
};

const BlogList = ({
  title,
  content,
  id,
  editHandler,
  deleteHandler,
  likeHandler,
  like,
}) => {
  const [showDeletePreview, setShowDeletePreview] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Mui.Paper
        elevation={3}
        sx={{
          padding: "1rem",
          paddingBottom: "0",
          marginTop: ".5rem",
          marginX: ".2rem",
        }}
      >
        <Mui.Typography
          variant="h6"
          sx={{
            fontSize: "1.25rem",
          }}
        >
          {title}
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
          {content}
        </Mui.Typography>
        <Mui.Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0",
            padding: "0",
            // border : '1px solid black',
          }}
        >
          <IconBtn
            title={"Like"}
            icon={<MuiIcons.ThumbUp sx={{ fontSize: 22 }} />}
            value={like}
            onClick={() => likeHandler(id)}
          />
          <Mui.Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <IconBtn
              title={"Edit"}
              icon={<MuiIcons.Edit />}
              onClick={() => editHandler(id)}
            />
            <IconBtn
              title={"Delete"}
              icon={<MuiIcons.Delete />}
              onClick={() => setShowDeletePreview((prev) => !prev)}
            />
          </Mui.Box>
        </Mui.Box>
      </Mui.Paper>
      {showDeletePreview && (
        <DeletePreview
          id={id}
          deleteHandler={deleteHandler}
          onCancel={() => setShowDeletePreview(false)}
        />
      )}
    </>
  );
};

export default BlogList;
