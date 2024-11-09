import mongoose,{Schema,model,models} from "mongoose";


const ResultSchema =new Schema({
    userId:{
        type:String,
        required:true
    },
    quizId:{
        type:mongoose.Schema.Types.ObjectId,ref :'Quiz',required:true
    },
    score:{
        type:Number,
        required:true
    }
})

const Result =models.Result || model("Result", ResultSchema)

export default Result