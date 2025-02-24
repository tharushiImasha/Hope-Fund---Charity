import {PrismaClient} from '@prisma/client';
import User from "../model/User";

const prisma = new PrismaClient();

export async function UserAdd(u: User){
    try{
        const newUser  = await prisma.user.create({
            data:{
                email: u.email,
                password: u.password,
                role: u.role,
            }
        })
        console.log('User Added :',newUser)
        return newUser;
    }catch(err) {
        console.log("error adding user", err);
    }
}

export async function UserDelete(email:string) {
    try{
        const deletedUser = await prisma.user.delete({
            where: {email: email}
        });
        console.log('User deleted :',email);
        return deletedUser;
    }catch(err){
        console.log("error deleting user", err);
    }
}

export async function getAllUsers(){
    try{
        return await prisma.user.findMany();
    }catch(err){
        console.log("error getting user from prisma data",err);
    }
}

export async function UserUpdate(id: string, u: User){
    try{
        const updatedUser = await prisma.user.update({
            where:{ email : u.email},
            data:{
                password: u.password,
                role: u.role,
            }
        })
        console.log('User updated :',updatedUser);
        return updatedUser;
    }catch(err){
        console.log("error updating user", err);
    }
}