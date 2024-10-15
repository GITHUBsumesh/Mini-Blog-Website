import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return next(new ErrorHandler("Invalid Username Or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Username Or Password", 400));

    sendCookie(user, res, `Okairi ${user.name}`);
  } catch (err) {
    next(err);
  }
};
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(new ErrorHandler("User not found", 404));
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({_id: { $ne: req.user._id } });
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (err) {
    next(err);
  }
};
export const updateProfile = async (req, res, next) => {
  try {
    const { name, age, bio, profilePic } = req.body;

    const user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { name, age, bio, profilePic },
      { new: true }
    );
    if (!user)
      return next(new ErrorHandler("Invalid Username Or Password", 400));

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exists", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    sendCookie(user, res, `Yokoso ${user.name}`, 201);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        httpOnly: true,
        expires: new Date(0),
        sameSite: "lax",
        secure: false,
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
        user: req.user,
      });
  } catch (err) {
    next(err);
  }
};

export const getMyProfile = async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
