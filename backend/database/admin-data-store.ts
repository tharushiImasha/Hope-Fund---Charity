import {PrismaClient} from '@prisma/client';
import Admin from "../model/Admin";

const prisma = new PrismaClient();

export async function AdminAdd(a: Admin){
    try{
        const newAdmin  = await prisma.admin.create({
            data:{
                adminId: a.adminId,
                name: a.name,
                phone: a.phone,
                userId: a.userId
            }
        })
        console.log('Admin Added :',newAdmin)
        return newAdmin;
    }catch(err) {
        console.log("error adding admin", err);
    }
}

export async function AdminDelete(adminId:string) {
    try{
        const deletedAdmin = await prisma.admin.delete({
            where: {adminId: adminId}
        });
        console.log('Admin deleted :',adminId);
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

export async function AdminUpdate(adminId: string, a: Admin){
    try{
        const updatedAdmin = await prisma.admin.update({
            where:{ adminId : a.adminId},
            data:{
                name: a.name,
                phone: a.phone,
                userId: a.userId
            }
        })
        console.log('Admin updated :',updatedAdmin);
        return updatedAdmin;
    }catch(err){
        console.log("error updating admin", err);
    }
}