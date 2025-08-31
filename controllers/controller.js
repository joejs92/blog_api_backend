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
        res.json("Worked!")
    }
    catch(err){
        console.log(err);
        res.json('Lame');
    }
}

//signup to be a contributor
async function contributorSignup(id){
    await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            status: 'contributor',
        }
    });
};

//update comment

//create comment

//delete comment

//delete all comments

//get all posts

//get unique post

//update post body

//update post published

//create post

//delete post

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

export {getAllUsers, signup, getUserByUsername, verifyToken, contributorSignup};