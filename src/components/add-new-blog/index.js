"use-client";
import { Button } from "../ui/button";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function AddNewBlog({
  openBlog,
  setopenBlog,
  loading,
  setloading,
  BlogforData,
  setBlogforData,
  handleSaveChanges,
  currentEditedBlogId,
  SetCurrentEditedBlog,
}) {
  return (
    <>
      <div>
        <Button onClick={() => setopenBlog(true)}>Add new Blog</Button>
      </div>

      <Dialog
        open={openBlog}
        onOpenChange={() => {
          setopenBlog(false);
          setBlogforData({ title: "", description: "" });
          SetCurrentEditedBlog(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentEditedBlogId ? "Edit Blog" :  "Add New Blog" }{''}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Title
              </Label>
              <Input
                name="id"
                placeholder="Enter blog Title"
                id="title"
                value={BlogforData.title}
                onChange={(e) =>
                  setBlogforData({ ...BlogforData, title: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-left">
                Description
              </Label>
              <Input
                id="description"
                className="col-span-3"
                name="description"
                placeholder="Write description"
                value={BlogforData.description}
                onChange={(e) =>
                  setBlogforData({
                    ...BlogforData,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSaveChanges}>
              {loading ? "Saving..changes " : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddNewBlog;
