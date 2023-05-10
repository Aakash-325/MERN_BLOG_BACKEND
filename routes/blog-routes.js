import express from "express";
import { addBlog, deleteBlog, getAllBlog, getById, getByUserId, updateBlog } from "../controller/blog-controller";

const blogRouter = express.Router();
 
blogRouter.get("/", getAllBlog);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getById);
blogRouter.delete("/delete/:id", deleteBlog);
blogRouter.get("/user/:id", getByUserId);

export default blogRouter;