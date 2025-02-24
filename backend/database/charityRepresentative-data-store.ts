import {PrismaClient} from '@prisma/client';
import CharityRepresentative from "../model/CharityRepresentative";

const prisma = new PrismaClient();

export async function CharityRepresentativeAdd(c: CharityRepresentative){
    try{
        const newCr  = await prisma.charityRepresentative.create({
            data:{
                crId: c.crId,
                name: c.name,
                address: c.address,
                userId: c.userId
            }
        })
        console.log('Cr Added :',newCr)
        return newCr;
    }catch(err) {
        console.log("error adding cr", err);
    }
}

export async function CharityRepresentativeDelete(crId:string) {
    try{
        const deletedCr = await prisma.charityRepresentative.delete({
            where: {crId: crId}
        });
        console.log('Cr deleted :',crId);
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

export async function CharityRepresentativeUpdate(crId: string, c: CharityRepresentative){
    try{
        const updatedCr = await prisma.charityRepresentative.update({
            where:{ crId : c.crId},
            data:{
                name: c.name,
                address: c.address,
                userId: c.userId
            }
        })
        console.log('Cr updated :',updatedCr);
        return updatedCr;
    }catch(err){
        console.log("error updating Cr", err);
    }
}