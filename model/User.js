import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlengh:6
    },
    blogs:[{type: mongoose.Types.ObjectId,ref:"Blog",require:true}]
});

export default mongoose.model("User", userSchema);

