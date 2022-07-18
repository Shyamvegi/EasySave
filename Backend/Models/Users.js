import mongoose  from "mongoose";
const {Schema,model} = mongoose;

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    likedBooks:[String],
    readLater:[String],
    isAdmin:Boolean,
});

const users = model('user',userSchema);

export default users;