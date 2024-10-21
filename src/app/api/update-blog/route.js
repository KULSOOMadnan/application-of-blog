import connecttoBD from "@/database/db";
import Blog from "@/models";
import Joi from "joi";
import { NextResponse } from "next/server";

const EditBlog = Joi.object({
    title : Joi.string().required(),
    description : Joi.string().required(),
})

export async function PUT(req) {
    try{
        await connecttoBD();
        const {searchParams} = new URL(req.url);
        const getCurrentBlogID = searchParams.get('id');

        if(!getCurrentBlogID){
            return NextResponse.json({
                success : false ,
                message : ' Blog id is required'
            })
        }

        const {title , description} = await req.json();

        const {error} = EditBlog.validate({
            title , description
          })
    
          if(error) {
            return NextResponse.json({
                success : false,
                message : error.details[0].message
            })
          }
    
          const updateBlogByid = await Blog.findOneAndUpdate({
            _id : getCurrentBlogID,
          },{title , description} , {new : true})


          if(updateBlogByid){
            return NextResponse.json({
                success : true ,
                message : 'Blog is updated Successfully'
            })
          }else{
            return NextResponse.json({
                success: false ,
                message :'something went wrong'
            })
          }

    }catch(error){
        console.log(error);
        return NextResponse.json({
            success: false ,
            message :'something went wrong'
        })
        

    }

}