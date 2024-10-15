import { Router } from "express";
import { UserController } from "../controllers/users.js";
import { verifyToken } from "../middlewares/token.js";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});


const upload = multer({ storage: storage }).single("profileImage");

export const usersRouter = Router();

// Get all users
usersRouter.get("/get", verifyToken, UserController.getAll);

// Register user
usersRouter.post("/register", UserController.registerNewUser);

// Login user
usersRouter.post("/login", UserController.getLogin);

// Update existing user
usersRouter.put("/update/:id", verifyToken, UserController.updateUser);

// Delete user
usersRouter.delete("/:id", verifyToken, UserController.deleteUser);

// Refresh token
usersRouter.get("/refreshToken", UserController.refreshToken);

// Upload profile image
usersRouter.post(
  "/:id/uploadProfileImage",
  verifyToken,
  upload,
  UserController.uploadProfileImage
);