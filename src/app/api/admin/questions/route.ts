import { NextRequest,NextResponse } from "next/server";

import { connectiondb } from "@/utils/mongo";
import Question from "@/models/Question";

connectiondb();


export async function POST(req:NextRequest){
    try {

        const {categoryId,questionText,options,correctAnswer}=await req.json();


        if(!categoryId || !questionText || !options ||!correctAnswer){
            return NextResponse.json({
                success:false,message:"missing required fields"
            },{status:400})
        }

        const newQuestion =new Question({
            categoryId,
            questionText,
            options,
            correctAnswer,
        })

        const savedQuestion =await newQuestion.save()

        return NextResponse.json({
            success:true,message:"Question added successfully",
            question:savedQuestion
        },{status:201})
        
    } catch (error) {

        console.error("Error adding question",error)
        return NextResponse.json({
            message:"Server error"},{status:500}
          )
        
    }
}