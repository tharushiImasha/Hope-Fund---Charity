import {PrismaClient} from '@prisma/client';
import Donors from "../model/Donors";
import User from "../model/User";

const prisma = new PrismaClient();

export async function DonorAdd(email: string, d: Donors){
    try{

        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: "123",
                role: "Donor"
            }
        });

        const newDonor  = await prisma.donors.create({
            data:{
                name: d.name,
                phone: d.phone,
                userId: newUser.userId
            }
        })
        console.log('Donor Added :',newDonor)
        return newDonor;
    }catch(err) {
        console.log("error adding donor", err);
    }
}

export async function DonorDelete(email:string) {
    try{

        const user = await prisma.user.findUnique({
            where: { email },
            select: { userId: true }
        });

        if (!user) {
            console.log("User not found!");
            return;
        }

        const deletedDonor = await prisma.donors.delete({
            where: {userId: user.userId}
        });
        console.log('Donor deleted :',email);
        return deletedDonor;
    }catch(err){
        console.log("error deleting donor", err);
    }
}

export async function getAllDonors(){
    try{
        return await prisma.donors.findMany();
    }catch(err){
        console.log("error getting donor from prisma data",err);
    }
}

export async function DonorUpdate(email: string, d: Donors){
    try{

        const user = await prisma.user.findUnique({
            where: { email },
            select: { userId: true }
        });

        if (!user) {
            console.log("User not found!");
            return;
        }

        const updatedDonor = await prisma.donors.update({
            where:{ userId : user.userId},
            data:{
                name: d.name,
                phone: d.phone,
                userId: d.userId
            }
        })
        console.log('Donor updated :',updatedDonor);
        return updatedDonor;
    }catch(err){
        console.log("error updating donors", err);
    }
}