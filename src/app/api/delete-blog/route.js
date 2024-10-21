import connecttoBD from "@/database/db";
import Blog from "@/models";
import { NextResponse } from "next/server";


export async function DELETE (req) {
    try{
        await connecttoBD();
        const {searchParams} = new URL(req.url);
        const getCurrentBlogID = searchParams.get('id');

        if (!getCurrentBlogID){
            return NextResponse.json({
                success : false ,
                message : 'Blog ID is required'
            })
        }

        const deleteCurrentId = await Blog.findByIdAndDelete(getCurrentBlogID);
        if(deleteCurrentId){
            return NextResponse.json({
                success : true ,
                message : 'Blog is Deleted succesfully'
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