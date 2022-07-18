import mongoose from "mongoose";
const {Schema,model} = mongoose;
const booksdata = new Schema({
    bookname:{
        type:String,
        required:true
    },
    authorname:{
        type:String,
        required:true
    },
    cost:{
        type:String,
        required:true
    },
    published_date:{
        type:String,
        required:true,
    },
    likes: {type:Number,default:0}
});

const books = model('books',booksdata);

export default books;