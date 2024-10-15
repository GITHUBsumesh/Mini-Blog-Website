import express from "express";
import {
  register,
  login,
  logout,
  getMyProfile,
  updateProfile,
  getAllUsers,
  getProfile,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/allusers", isAuthenticated, getAllUsers);

router.get("/profile", isAuthenticated, getMyProfile);
router.put("/profile/update", isAuthenticated, updateProfile);
router.get("/:id", isAuthenticated, getProfile);

export default router;
