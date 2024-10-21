import connecttoBD from "@/database/db"
import Blog from "@/models";
import Joi from "joi";
import { NextResponse } from "next/server"


const AddNewBlog = Joi.object({
    title : Joi.string().required(),
    description : Joi.string().required()
})

export async function POST(req){
    try{
        await connecttoBD() ;

        const extractBlogDta = await req.json();
        const {title , description} = extractBlogDta;

      const {error} = AddNewBlog.validate({
        title , description
      })

      if(error) {
        return NextResponse.json({
            success : false,
            message : error.details[0].message
        })
      }

        const newlycreatedBlogItems = await Blog.create(extractBlogDta);
        if(newlycreatedBlogItems){
            return NextResponse.json({
                success : true ,
                message : 'Blog added succefully'
            })
        }else{
            return  NextResponse.json({
                success:false,
                message:"something went Wrong",
            })
        }

    }catch(error){
        console.log(error);
        
        return  NextResponse.json({
            success:false,
            message:"something went Wrong",
        })
    }
}
  

  