import BlogOverview from "@/components/blogOverview/index.js";

async function fetechListOfBlogs() {
  try {
    const apiResponce = await fetch("http://localhost:3000/api/get-blogs", {
      method: "GET",
      cache: "no-store",
    });

    const result = await apiResponce.json();
    return result?.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function Blog() {
  const blogLIST = await fetechListOfBlogs();
  console.log(blogLIST, "BLOGLIST");

  return <BlogOverview blogLIST ={blogLIST} />;
}

export default Blog;
