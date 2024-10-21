import mongoose from "mongoose";


const blogScheme = new mongoose.Schema({
    title : String,
    description :String 
});

const Blog = mongoose.models.Blog || mongoose.model('Blog' , blogScheme)

export default Blog;