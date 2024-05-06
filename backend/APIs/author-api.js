//create author api
const exp=require('express')
const authorApp=exp.Router();

const bcryptjs=require('bcryptjs')
const expressAsyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
const verifyToken=require('../Middlewares/verifyToken')
require('dotenv').config()
//const commonApp=require('./common-api')
let authorscollections;
let articlescollection;
//get authorcollection app
authorApp.use((req,res,next)=>{
    authorscollections=req.app.get('authorscollections')
    articlescollection=req.app.get('articlescollection')
    next()
})

authorApp.post('/author',expressAsyncHandler(async(req,res)=>{
    const newAuthor=req.body;
    //check for the duplicate user based on username
    const dbUser=await authorscollections.findOne({username:newAuthor.username})
    //if user found in db
    if(dbUser!==null)
    res.send({message:"Username is already existed"})
else{
    //hash password
    const hashedPassword=await bcryptjs.hash(newAuthor.password,6)
    //replace plain password with hashed
    newAuthor.password=hashedPassword;
    //create user
    await authorscollections.insertOne(newAuthor);
    res.send({message:"Author created"})
}
}))

//author login
authorApp.post('/login',expressAsyncHandler(async(req,res)=>{
    //get cred obj from client
    const authorCred=req.body;
    //check for username
    const dbUser=await authorscollections.findOne({username:authorCred.username})
    if(dbUser===null)
     res.send({message:"Invalid username"})
    else{
        //check for password
        const status=await bcryptjs.compare(authorCred.password,dbUser.password)
        if(status===false)
        res.send({message:"Invalid password"})
    else{
        //create jwt token and encode it
        const signedToken=jwt.sign({username:dbUser.username},process.env.SECRET_KEY,{expiresIn:100})
        //send res
        res.send({message:"Login Success",token:signedToken,user:dbUser})
    }
    }
}))

//adding new article by author
authorApp.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get new article from client
    const newArticle=req.body;
    //post to articles collection
   await articlescollection.insertOne(newArticle);
//send res
   res.send({message:"New article created"})
}))


//modify article by author
authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get modified article from client
    const modifiedArticle=req.body;
    //update article by id
    let result=await articlescollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
     res.send({message:"Article modified"})
}))


//delete article by articleId
authorApp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get articleId from url
    const articleFromUrl=req.params.articleId;
    //get article
    const articleToDelete=req.body;
    //update status of article to false
    await articlescollection.updateOne({articleId:articleFromUrl},{$set:{...articleToDelete,status:false}})
    res.send({message:"Article removed"})
}))

//read articles of author
authorApp.get('/articles/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get author's name fron url
    const authorName=req.params.username;
    //get articles whose status is true
    const articlesList=await articlescollection.find({status:true,username:authorName}).toArray()
    res.send({message:"List of Articles",payload:articlesList})
}))

//export authorApp
module.exports=authorApp;