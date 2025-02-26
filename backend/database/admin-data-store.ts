import {PrismaClient} from '@prisma/client';
import Admin from "../model/Admin";
import User from "../model/User";

const prisma = new PrismaClient();

export async function AdminAdd(email: string, a: Admin){
    try{

        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: "123",
                role: "ADMIN"
            }
        });

        const newAdmin  = await prisma.admin.create({
            data:{
                name: a.name,
                phone: a.phone,
                address: a.address,
                userId: newUser.userId
            }
        })
        console.log('Admin Added :',newAdmin)
        return newAdmin;
    }catch(err) {
        console.log("error adding admin", err);
    }
}

export async function AdminDelete(email:string) {
    try{

        const user = await prisma.user.findUnique({
            where: { email },
            select: { userId: true }
        });

        if (!user) {
            console.log("User not found!");
            return;
        }

        const deletedAdmin = await prisma.admin.delete({
            where: { userId: user.userId }
        });

        const deletedUser = await prisma.user.delete({
            where: { userId: user.userId }
        });

        console.log("Admin deleted:", email);
        return deletedAdmin;

    }catch(err){
        console.log("error deleting admin", err);
    }
}

export async function getAllAdmins(){
    try{
        return await prisma.admin.findMany();
    }catch(err){
        console.log("error getting admin from prisma data",err);
    }
}

export async function AdminUpdate(email: string, a: Admin){
    try{

        const user = await prisma.user.findUnique({
            where: { email },
            select: { userId: true }
        });

        if (!user) {
            console.log("User not found!");
            return;
        }

        const updatedAdmin = await prisma.admin.update({
            where:{ userId : user.userId},
            data:{
                name: a.name,
                phone: a.phone,
                address: a.address,
            }
        })
        console.log('Admin updated :',updatedAdmin);
        return updatedAdmin;
    }catch(err){
        console.log("error updating admin", err);
    }
}