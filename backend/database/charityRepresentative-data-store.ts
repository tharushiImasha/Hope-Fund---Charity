import {PrismaClient} from '@prisma/client';
import CharityRepresentative from "../model/CharityRepresentative";
import User from "../model/User";

const prisma = new PrismaClient();

export async function CharityRepresentativeAdd(email: string, c: CharityRepresentative){
    try{

        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: "123",
                role: "ADMIN"
            }
        });

        const newCr  = await prisma.charityRepresentative.create({
            data:{
                name: c.name,
                address: c.address,
                nic: c.nic,
                userId: newUser.userId
            }
        })
        console.log('Cr Added :',newCr)
        return newCr;
    }catch(err) {
        console.log("error adding cr", err);
    }
}

export async function CharityRepresentativeDelete(email:string) {
    try{

        const user = await prisma.user.findUnique({
            where: { email },
            select: { userId: true }
        });

        if (!user) {
            console.log("User not found!");
            return;
        }

        const deletedCr = await prisma.charityRepresentative.delete({
            where: {userId: user.userId}
        });
        console.log('Cr deleted :',email);
        return deletedCr;
    }catch(err){
        console.log("error deleting Cr", err);
    }
}

export async function getAllCharityRepresentatives(){
    try{
        return await prisma.charityRepresentative.findMany();
    }catch(err){
        console.log("error getting cr from prisma data",err);
    }
}

export async function CharityRepresentativeUpdate(email: string, c: CharityRepresentative){
    try{

        const user = await prisma.user.findUnique({
            where: { email },
            select: { userId: true }
        });

        if (!user) {
            console.log("User not found!");
            return;
        }

        const updatedCr = await prisma.charityRepresentative.update({
            where:{ userId : user.userId},
            data:{
                name: c.name,
                address: c.address,
                nic: c.nic,
                userId: c.userId
            }
        })
        console.log('Cr updated :',updatedCr);
        return updatedCr;
    }catch(err){
        console.log("error updating Cr", err);
    }
}