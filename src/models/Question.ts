import mongoose,{Schema,model,models} from "mongoose";


const QuestionSchema =new Schema ({

    categoryId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',required:true,
    }
    ,questionText:{
        type:String,
        required:true,
    },
    options: {
        A: { type: String, required: true },
        B: { type: String, required: true },
        C: { type: String, required: true },
        D: { type: String, required: true },
    },
    

    correctAnswer:{
        type:String,
        required:true
    }
})


const Question =models.Question || model("Question",QuestionSchema)

export default Question