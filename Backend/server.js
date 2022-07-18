import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import books from './Models/Books.js'
import users from './Models/Users.js';
import authorize from './middleware/authorize.js'


mongoose.connect("mongodb+srv://Shyam:qwe123@cluster0.bjsgy.mongodb.net/?retryWrites=true&w=majority",).then(
    ()=>console.log('db connected')
)

const app = express();
app.use(express.json());


app.get('/',(req,res)=>{
    return res.send("<h1>Hello World!</h1>");
});

app.post('/register',async (req,res)=>{
    try{
        const {username,email,password,confirmPassword} = req.body;
        console.log(req);
        const isAdmin = false;
        if(password===confirmPassword){
                const newUser = new users({
                    username,email,password,isAdmin
                });
                newUser.save(function(err){
                    if(err){
                        if (err.name === 'MongoServerError' && err.code === 11000) {
                            res.status(400).send(`User ${username} already exist`);
                        }
                    }
                    else{
                        res.status(200).send(`<h1>${username} registered Succesfully</h1>`)
                    }
                });
                return res;
            }
        else{
            return res.status(200).send("<h1>alert('Password Not Matched')</h1>");
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
});


app.post('/registeradmin',async (req,res)=>{
    try{
        const {username,email,password,confirmPassword} = req.body;
        const isAdmin = true;
        if(password===confirmPassword){
                const newUser = new users({
                    username,email,password,isAdmin
                });
                newUser.save(function(err){
                    if(err){
                        if (err.name === 'MongoServerError' && err.code === 11000) {
                            console.log("Inside error");
                            res.status(400).send('User already exist');
                        }
                    }
                    else{
                        res.status(200).send(`<h1>${username} registered Succesfully</h1>`)
                    }
                });
                return res;
            }
        else{
            return res.status(200).send("<h1>alert('Password Not Matched')</h1>");
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
});

app.post('/login',async (req,res)=>{
    try{
        const {username,password} = req.body;
        const data = await users.where('username').equals(username).select("id password" );
        console.log(data.password);
        data[0].username=username
        if(data[0].password!==password){
            return res.status(404).send("Invalid Credentials");
        }
        const payload = {
            data:username
        }
        jwt.sign(payload,'jwtPassword',{expiresIn:3600000},
        (err,token)=>{
            if(err)console.log(err);
            console.log(token);
        })
        return res.status(200).send("Logged in successfully");
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error");
    }
});

app.post('/logout',authorize,(req,res)=>{
    try{
        req.data = "logout";
        return res.status(200).send("LoggedOut Successfully");
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error");
    }
});

app.get('/books',async(req,res)=>{
    try{  
        const booksdata =  await books.find({});
        console.log(booksdata);
        return res.status(200).send(booksdata);
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error");
    }
});

app.post('/addbooks',(req,res)=>{
    try{
        const {bookname,authorname,cost,published_date} = req.body;
        const addedbook = new books({
            bookname,authorname,cost,published_date
        });
        addedbook.save();
        return res.status(200).send(`${bookname} Added Successfully`);
    }
    catch(err){
        console.log(err);
        return res.status(404).send("Permission denied");
    }
})


app.get('/likedbooks',authorize,async(req,res)=>{
    try{
        const user = await users.find({"username":req.data});
        console.log(user[0].likedBooks)
        return res.status(200).send(user[0].likedBooks);
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error");
    }
});

app.post('/likedbooks',authorize,async(req,res)=>{
    try{
        const user = await users.find({"username":req.data});
        user[0].likedBooks.push(req.body.bookid);
        await users.findOneAndUpdate({"username":req.data},{"likedBooks":user[0].likedBooks ,"likes":user[0].likes});
        return res.status(200).send("Added into liked books");
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error");
    }
})

app.get('/readlater',authorize,async(req,res)=>{
    try{
        const user = await users.find({"username":req.data});
        return res.status(200).send(user[0].readLater);
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error");
    }
})

app.post('/readlater',authorize,async(req,res)=>{
    try{
        const user = await users.find({"username":req.data});
        user[0].readLater.push(req.body.bookid);
        await users.findOneAndUpdate({"username":req.data},{"readLater":user[0].readLater});
        return res.status(200).send("Added into ReadLater books");
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error");
    }
});
app.listen(5000,()=>console.log("Server Running at http://localhost:5000"));