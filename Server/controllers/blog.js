import ErrorHandler from "../middlewares/error.js";
import { Blog } from "../models/blog.js";

export const createBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    await Blog.create({
      title,
      content,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({});

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    next(error);
  }
};
export const getMyBlogs = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const blogs = await Blog.find({ user: userid });

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    next(error);
  }
};
export const getTheBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return next(new ErrorHandler("Blog not found", 404));

    res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    next(error);
  }
};
export const editBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id }, // Filter to find the blog by ID
      {
        title: req.body.title,
        content: req.body.content, // Combine updates into one object
      },
      { new: true } // Option to return the updated document
    );

    if (!blog) return next(new ErrorHandler("Blog not found", 404));

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findOneAndDelete({ _id: req.params.id });

    if (!blog) return next(new ErrorHandler("Blog not found", 404));

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const likeBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    let message = "";
    if (!blog.likes.includes(req.user._id)) {
      blog.likes.push(req.user._id);
      message = "Blog liked successfully";
    } else {
      blog.likes = blog.likes.filter(
        (like) => like.toString() !== req.user._id.toString()
      );
      message = "Blog unliked successfully";
    }

    await blog.save();

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    next(error);
  }
};
