import express from "express";

import {
  createBlog,
  getAllBlogs,
  getMyBlogs,
  editBlog,
  deleteBlog,
  likeBlog,
  getTheBlog,
} from "../controllers/blog.js";

import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/new", isAuthenticated, createBlog);

router.get("/all", isAuthenticated, getAllBlogs); // get all blogs of all users

router.get("/my", isAuthenticated, getMyBlogs); // get all blogs of a user

router
  .route("/:id")
  .get(isAuthenticated, getTheBlog)
  .put(isAuthenticated, editBlog)
  .delete(isAuthenticated, deleteBlog);

router.put("/like/:id", isAuthenticated, likeBlog);

export default router;
