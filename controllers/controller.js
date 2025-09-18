import encryptpassword from "./encryption.js";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

//login
async function getUserByUsername(name){
    const user = await prisma.user.findFirst({
        where:{username: name }
    })
    return user;
}

//logout (See the logout route)

//signup as user
//What response should there be? What validation should be put here?
//Is there a way to allow the user to customize the response without
//needing the user to alter the code in the API? Maybe have whatever
//will be in the redirect be passed as part of the req.
async function signup(req, res){
    try {
        const hashedPassword = await encryptpassword(req.body.password);
        const newUser = await prisma.user.create({
            data: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: hashedPassword,
                status: "user"
            }
        })
        //How would a real API handle a response?
        res.json("Signup Worked!")
    }
    catch(err){
        console.log(err);
        res.json('Lame');
    }
}

//signup to be a contributor. Need to fix the function parameters.
async function contributorSignup(id){
    try{
        await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                status: 'contributor',
            }
        });
        //res.json("contributorSignup Worked!")
    }
    catch(err){
        console.log(err);
        //res.json('Lame');
    }
};

//update comment
async function updateComment(req, res){
    const id = parseInt(req.params.commentId);
    try{
        await prisma.comment.update({
            where: {
                id: id,
            },
            data: {
                body: req.body.content,
                isEdited: true
            }
        });
        res.json("updateComment Worked!")
    }
    catch(err){
        console.log(err);
        res.json('Lame');
    }
}

//create comment
async function createComment(req, res){
    try{
        await prisma.post.create({
            data: {
                body: req.body.content,
                postId: req.body.postId,
                userId: req.body.userId,
                added: new Date(),
                isEdited: false
            }
        });
        res.json("createComment Worked!")
    }
    catch(err){
        console.log(err);
        res.json('Lame');
    }
}

//delete comment
async function deleteComment(req, res){
    const id = parseInt(req.params.commentId);
    try{
        await prisma.comment.delete({
            where: {commentId: id}
        });
        res.json("deleteComment Worked!")
    }
    catch(err){
        console.log(err);
        res.json('Lame');
    }
}

//get all comments for a particular post
async function getAllComments(req, res){
    const id = parseInt(req.params.postId);
    try{
        await prisma.comment.findMany({
            where:{postId:{equals: id}}
        });
        res.json("getAllComments Worked!")
    }
    catch(err){
        console.log(err);
        res.json('Lame');
    }
}

//get unique comment (Do we really need this one?)
async function getUniqueComment(req, res){
    const id = parseInt(req.params.commentId);
    try{
        await prisma.comment.findFirst({
            where:{commentId: id }
        })
        res.json("getUniqueComment Worked!")
    }
    catch(err){
        console.log(err);
        res.json('Lame');
    }
}

//get all posts
async function getAllPosts(req, res){
    try{
        await prisma.post.findMany();
        res.json("getAllPosts Worked!")
    }
    catch(err){
        console.log(err);
        res.json('Lame');
    }
}

//get unique post
async function getPost(req, res){
    const id = parseInt(req.params.postId);
    //Should also get all comments associated with this post.
    try{
        await prisma.post.findFirst({
            where:{postId: id }
        })
        res.json("getPost Worked!")
    }
    catch(err){
        console.log(err);
        res.json('Lame');
    }
}

//update post content
async function updatePostContent(req, res){
    const id = parseInt(req.params.postId);
    try{
        await prisma.post.update({
            where: {
                id: id,
            },
            data: {
                body: req.body.content,
            }
        });
        res.json("updatePostContent Worked!")
    }
    catch(err){
        console.log(err);
        res.json('Lame');
    }
}

//update post published
async function updatePostPublish(req, res){
    //there will have to be a value attached to the body called 'isPublished'
    //that value will need to be either True or False.
    const id = parseInt(req.params.postId);
    try{
        await prisma.post.update({
            where: {
                id: id,
            },
            data: {
                published: req.body.isPublished,
            }
        });
        res.json("updatePostPublish Worked!")
    }
    catch(err){
        console.log(err);
        res.json('Lame');
    }
}

//create post
async function createPost(req, res){
    try{
        await prisma.post.create({
            data: {
                title: req.body.title,
                body: req.body.content,
                published: req.body.published,
                userId: req.body.userId
            }
        })
        res.json("createPost Worked!")
    }
    catch(err){
        console.log(err);
        res.json('Lame');
    }
}

//delete post
async function deletePost(req,res){
    const id = parseInt(req.params.postId);
    try{
        //delete all comments in this post.
        await prisma.comment.deleteMany({
            where:{postId: {equals: id}}
        });
        //then delete the post
        await prisma.post.delete({
            where: {postId: id}
        });
        res.json("deletePost Worked!")
    }
    catch(err){
        console.log(err);
    }
}

//verify token
function verifyToken(req, res, next){
    //get auth header value. See jwt_api in experiments for more detail.
    const bearerHeader = req.headers['Authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //split at the space, see token format above
        const bearer = bearerHeader.split(" ");
        //get token from array
        const bearerToken = bearer[1];
        req.token = bearerToken;
        //next middleware
        next();
    } else {
        //Forbidden
        res.sendStatus(403);
    };
};

//test (to see if connection to DB works, which it does)
async function getAllUsers(req, res){
    const users = await prisma.user.findMany();
    res.json(users);
;}

export {getAllUsers, 
    signup, 
    getUserByUsername, 
    verifyToken, 
    contributorSignup,
    createPost, 
    deletePost,
    updatePostPublish,
    updatePostContent,
    getPost,
    getAllPosts,
    createComment,
    updateComment,
    deleteComment,
    getAllComments,
    getUniqueComment
};