"use client";

import { useState } from "react";
import AddNewBlog from "../add-new-blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Label } from "../ui/label";

const initialblogFormData = {
  title: "",
  description: "",
};

function BlogOverview({ blogLIST }) {
  const [openBlog, setopenBlog] = useState(false);
  const [loading, setloading] = useState(false);
  const [BlogforData, setBlogforData] = useState(initialblogFormData);
  const [currentEditedBlog , SetCurrentEditedBlog] = useState(null);
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  console.log(BlogforData);

  const handleSaveChanges = async () => {
    try {
      setloading(true);
      const apiResponse = currentEditedBlog !== null ?  await fetch(`/api/update-blog?id=${currentEditedBlog}` , {
        method : 'PUT' ,
        body: JSON.stringify(BlogforData),
      }) :
       await fetch("/api/add-blog" , {
        method: "POST",
        body: JSON.stringify(BlogforData),
      })

      const result = await apiResponse.json();
      if (result?.success) {
        setBlogforData(initialblogFormData);
        setopenBlog(false);
        SetCurrentEditedBlog(null)
        setloading(false);
        router.refresh();
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      setloading(false);
      setBlogforData(initialblogFormData);
    }
  };

  async function handleDeletebyID(getCurrentID) {
    try {
      const apiResponse = await fetch(`/api/delete-blog?id=${getCurrentID}`, {
        method: "DELETE",
      });
      const result = await apiResponse.json();

      if (result?.success) {
        router.refresh();
      }
    } catch (e) {
      console.log(e);
    }
  }


  function handleEditbyID(getCurrentBlog){
    SetCurrentEditedBlog(getCurrentBlog?._id)
    setBlogforData({
      title : getCurrentBlog?.title ,
      description : getCurrentBlog?.description,
    })
    setopenBlog(true)
  }

  console.log(currentEditedBlog);
  

  return (
    <div className="min-h-screen flex  flex-col gap-10 bg-gradient-to-r from-purple-500 to-slate-800 p-6">
      <AddNewBlog
        openBlog={openBlog}
        setopenBlog={setopenBlog}
        loading={loading}
        setloading={setloading}
        BlogforData={BlogforData}
        setBlogforData={setBlogforData}
        handleSaveChanges={handleSaveChanges}
        currentEditedBlog ={currentEditedBlog}
        SetCurrentEditedBlog ={SetCurrentEditedBlog}
      ></AddNewBlog>
      <div className="grid grid-cols-1 sm:grid-cols lg:grid-cols-3 gap-6 mt-5">
        {blogLIST && blogLIST.length > 0
          ? blogLIST.map((blogitems) => (
              <Card className="p-5">
                <CardContent>
                  <CardTitle className="mb-5">{blogitems?.title}</CardTitle>
                  <CardDescription>{blogitems?.description}</CardDescription>
                  <div className="mt-5  flex gap-5  items-center">
                    <Button onClick ={() => handleEditbyID(blogitems)}>Edit</Button>
                    <Button onClick={() => handleDeletebyID(blogitems?._id)}>
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          : <Label className = 'text-3xl font-extrabold text-gray-700 items-center'> No Blog Found</Label>}
      </div>
    </div>
  );
}

export default BlogOverview;
