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
    options:{
        type:String,
        required:true
    },

    correctAnswer:{
        type:String,
        required:true
    }
})


const Question =models.Question || model("Question",QuestionSchema)

export default Question