import encryptpassword from "./encryption.js";
import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

//login

//logout

//signup
async function signup(req, res){
    //console.log(req.body.password);
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
        //res.redirect("/");
    }
    catch(err){
        console.log(err);
        res.json('Lame');
        //res.redirect("/");
    }
}

//signup to be a contributor

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

//test (to see if connection to DB works, which it does)
async function getAllUsers(req, res){
    const users = await prisma.user.findMany();
    res.json(users);
;}

export {getAllUsers, signup};