import { NextRequest, NextResponse } from "next/server";
import { connectiondb } from "@/utils/mongo";
import Category from "@/models/Category";




export const POST =async(req:NextRequest)=>
 {
  await connectiondb();

  
    try {
      const {categoryName} = await req.json();

      if (!categoryName) {
        return NextResponse.json({success:false,message:'Category name is required'},{status:400})

      }


      const newCategory =new Category({name:categoryName})
      await newCategory.save();
     return NextResponse.json({success:true,newCategory},{status:201})
    } catch (error) {

       return NextResponse.json({success:false,message:'Error creating category '},{status:500})
    }
}
  
export const GET=async(req:NextRequest)=>{

  await connectiondb();
    try {
        const categories =await Category.find({})
       return NextResponse.json({success:true,categories})
        
    } catch (error) {
       return NextResponse.json({success:false,message:'error retriving categories'},{status:500})
        
    }
  }


