import {PrismaClient} from '@prisma/client';
import Donors from "../model/Donors";

const prisma = new PrismaClient();

export async function DonorAdd(d: Donors){
    try{
        const newDonor  = await prisma.donors.create({
            data:{
                donorId: d.donorId,
                name: d.name,
                phone: d.phone,
                userId: d.userId
            }
        })
        console.log('Donor Added :',newDonor)
        return newDonor;
    }catch(err) {
        console.log("error adding donor", err);
    }
}

export async function DonorDelete(donorId:string) {
    try{
        const deletedDonor = await prisma.donors.delete({
            where: {donorId: donorId}
        });
        console.log('Donor deleted :',donorId);
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

export async function DonorUpdate(donorId: string, d: Donors){
    try{
        const updatedDonor = await prisma.donors.update({
            where:{ donorId : d.donorId},
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