import {PrismaClient} from '@prisma/client';
import Donation from "../model/Donation";

const prisma = new PrismaClient();

export async function DonationAdd(d: Donation){
    try{
        const newDonation  = await prisma.donation.create({
            data:{
                donationId: d.donationId,
                donorId: d.donorId,
                causeId: d.causeId,
                amount: d.amount,
                date: d.date,
                paymentMethod: d.paymentMethod,
                message: d.message
            }
        })
        console.log('Donation Added :',newDonation)
        return newDonation;
    }catch(err) {
        console.log("error adding donation", err);
    }
}

export async function DonationDelete(donationId:string) {
    try{
        const deletedDonation = await prisma.donation.delete({
            where: {donationId: donationId}
        });
        console.log('Donation deleted :',donationId);
        return deletedDonation;
    }catch(err){
        console.log("error deleting donation", err);
    }
}

export async function getAllDonations(){
    try{
        return await prisma.donation.findMany();
    }catch(err){
        console.log("error getting donation from prisma data",err);
    }
}

export async function DonationUpdate(donationId: string, d: Donation){
    try{
        const updatedDonation = await prisma.donation.update({
            where:{ donationId : d.donationId},
            data:{
                donorId: d.donorId,
                causeId: d.causeId,
                amount: d.amount,
                date: d.date,
                paymentMethod: d.paymentMethod,
                message: d.message
            }
        })
        console.log('Donation updated :',updatedDonation);
        return updatedDonation;
    }catch(err){
        console.log("error updating donation", err);
    }
}