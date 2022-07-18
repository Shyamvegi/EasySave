import jwt from 'jsonwebtoken';

const authorize = (req,res,next) =>{
    try{
        const token = req.header('x-token');
        console.log(token);
        if(!token){
            return res.status(404).send("No Token Found");
        }
        const decoded = jwt.verify(token,'jwtPassword');
        console.log(decoded);
        req.data = decoded.data
        next()
    }
    catch(err){
        console.log(err);
        return res.status(400).send('Access Denied');
    }
}

export default authorize;