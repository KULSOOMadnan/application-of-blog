import connecttoBD from "@/database/db";
import Blog from "@/models";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        await connecttoBD();
        const extractAllBlogsFromDb = await Blog.find({})
        if(extractAllBlogsFromDb){
            return NextResponse.json({
                success :true ,
                data : extractAllBlogsFromDb
            })
        }
    }catch(error){
        console.log(error);
        return NextResponse.json({
            success : false ,
            message :'Something Went wrong '
        })
        
    }
}