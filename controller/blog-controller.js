import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBlog = async (req, res, next) => {
    let blogs; 
    try {
        blogs = await Blog.find().populate('user');
    } catch {
        console.log(err);
    }

    if (!blogs) {
        return res.status(404).json({ message: "No blog found." })
    }
    return res.status(200).json({ blogs })
}

export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        console.log(err);
    }
    if (!existingUser) {
        return res.status(400).json({ message: "Unable to find the user by this ID" })
    }
    const blog = new Blog({
        title,
        description,
        image,
        user
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session })
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        return res.status(200).json({ message: err })
    }

    return res.status(200).json({ blog });
};

export const updateBlog = async (req, res, next) => {
    const { title, description, image} = req.body;
    const blogId = req.params.id;
    let blog;

    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description,
            image
        })
    } catch (err) {
        console.log(err);
    }
    if (!blog) {
        res.status(500).json({ message: "Unable to save!" });
    }

    return res.status(200).json({ blog });
}

export const getById = async (req, res, next) => {
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(blogId);
        blog.save()
    } catch (err) {
        console.log(err);
    }
    if (!blog) {
        return res.status(404).json({ message: "Not found!" })
    }

    return res.status(200).json({ blog });
}


export const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    try {
      const blog = await Blog.findByIdAndRemove(id).populate("user");
  
      if (!blog) {
        return res.status(404).json({ message: "Blog not found!" });
      }
  
      const user = blog.user;
      user.blogs.pull(blog);
      await user.save();
  
      return res.status(200).json({ message: "Deleted successfully!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Unable to delete!" });
    }
  };


export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate("blogs");
    }catch(err){
        console.log(userId, userBlogs);
    }
    if(!userBlogs){
        return res.status(404).json({message:"No blog Found!"})
    }
    return res.status(200).json({blogs:userBlogs})
} 