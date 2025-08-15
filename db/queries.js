import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

//for testing that everything is connected properly.
async function createAUser(req, res){
    await prisma.user.create({
        data:{
            firstname: "Joe",
            lastname: "Mama",
            username: "joemama",
            password: "threeve",
            status: "admin",
        }
    })
}