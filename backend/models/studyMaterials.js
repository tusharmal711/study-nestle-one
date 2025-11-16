const mongoose=require("mongoose");
const{Schema}=mongoose;

const studySchema = new Schema({
    title:{type:String,required: true,},
     description:{type:String,required: true,},
      subject:{type:String,required: true,},
       linkOrFile:{type:String,required: true,},
       publicId: { type: String }, // Add this field
        uploadedBy:{ type: Schema.Types.ObjectId, ref: "User"},
        isApprove:{type:Boolean,default:false}
        

},{timestamps:true});

const material=mongoose.model("material",studySchema);

module.exports=material;