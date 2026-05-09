import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  generateBlog,
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();
router.use(protect);

router.post("/generate", generateBlog);
router.post("/", createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;