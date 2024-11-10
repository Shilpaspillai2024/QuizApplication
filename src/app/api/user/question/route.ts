import { NextRequest, NextResponse } from "next/server";
import { connectiondb } from "@/utils/mongo";
import Question from "@/models/Question";
import mongoose from "mongoose";

connectiondb();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("category");

    if (!categoryId) {
      return NextResponse.json(
        { success: false, message: "Category ID is required" },
        { status: 400 }
      );
    }

    
    const questions = await Question.find({ categoryId}).exec();

    if (questions.length === 0) {
      console.log("No questions found for category:", categoryId);
      return NextResponse.json(
        { success: false, message: "No questions found for this category" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, questions });
  } catch (error) {
    console.error("Error fetching questions", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
