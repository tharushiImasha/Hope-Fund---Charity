// import {PrismaClient} from '@prisma/client';
// import CharityProgramme from "../model/CharityProgramme";
//
// const prisma = new PrismaClient();
//
// export async function CharityProgrammeAdd(c: CharityProgramme, imageBase64: string, documentationBase64: string){
//     try{
//         const newCp = await prisma.charityProgramme.create({
//             data: {
//                 causeId: c.causeId,
//                 title: c.title,
//                 description: c.description,
//                 documentation: documentationBase64, // Store PDF as Base64
//                 date: c.date,
//                 category: c.category,
//                 location: c.location,
//                 image: imageBase64, // Store Image as Base64
//                 goalAmount: c.goalAmount,
//                 raisedAmount: c.raisedAmount,
//                 verifiedStatus: c.verifiedStatus,
//                 crId: c.crId,
//                 adminId: c.adminId
//             }
//         });
//         console.log('Cp Added :', newCp);
//         return newCp;
//     } catch (err) {
//         console.log("Error adding cp", err);
//     }
// }
//
//
// export async function CharityProgrammeDelete(causeId:string) {
//     try{
//         const deletedCp = await prisma.charityProgramme.delete({
//             where: {causeId: causeId}
//         });
//         console.log('Cp deleted :',causeId);
//         return deletedCp;
//     }catch(err){
//         console.log("error deleting Cp", err);
//     }
// }
//
// export async function getAllCharityProgrammes(){
//     try{
//         return await prisma.charityProgramme.findMany();
//     }catch(err){
//         console.log("error getting cp from prisma data",err);
//     }
// }
//
// export async function CharityProgrammeUpdate(causeId: string, c: CharityProgramme){
//     try{
//         const updatedCp = await prisma.charityProgramme.update({
//             where:{ causeId : c.causeId},
//             data:{
//                 title: c.title,
//                 description: c.description,
//                 documentation: c.documentation,
//                 date: c.date,
//                 category: c.category,
//                 location: c.location,
//                 image: c.image,
//                 goalAmount: c.goalAmount,
//                 raisedAmount: c.raisedAmount,
//                 verifiedStatus: c.verifiedStatus,
//                 crId: c.crId,
//                 adminId: c.adminId
//             }
//         })
//         console.log('Cp updated :',updatedCp);
//         return updatedCp;
//     }catch(err){
//         console.log("error updating Cp", err);
//     }
// }


import {PrismaClient} from '@prisma/client';
import CharityProgramme from "../model/CharityProgramme";
const prisma = new PrismaClient();

export async function CharityProgrammeAdd(c: CharityProgramme){
    try{

        if (c.image && !c.image.startsWith('data:image/')) {
            throw new Error('Invalid image format. Base64 image data required');
        }

        if (c.documentation && !c.documentation.startsWith('data:application/pdf')) {
            throw new Error('Invalid documentation format. Base64 PDF data required');
        }

        const newCp = await prisma.charityProgramme.create({
            data:{
                causeId: c.causeId,
                title: c.title,
                description: c.description,
                documentation: c.documentation,
                date: c.date,
                category: c.category,
                location: c.location,
                image: c.image,
                goalAmount: c.goalAmount,
                raisedAmount: c.raisedAmount,
                verifiedStatus: c.verifiedStatus,
                crId: c.crId,
                adminId: c.adminId
            }
        })
        console.log('Cp Added with files converted to base64');
        return newCp;
    }catch(err) {
        console.log("error adding cp with files", err);
        throw err;
    }
}

export async function CharityProgrammeDelete(causeId:string) {
    try{
        const deletedCp = await prisma.charityProgramme.delete({
            where: {causeId: causeId}
        });
        console.log('Cp deleted :',causeId);
        return deletedCp;
    }catch(err){
        console.log("error deleting Cp", err);
        throw err; // Re-throw to handle in the route
    }
}

export async function getAllCharityProgrammes(){
    try{
        // For performance reasons, you might want to exclude the large base64 fields
        // when retrieving all charity programs
        return await prisma.charityProgramme.findMany({
            select: {
                causeId: true,
                title: true,
                description: true,
                date: true,
                category: true,
                location: true,
                // Send a thumbnail version or just first 100 chars of base64
                image: true,
                goalAmount: true,
                raisedAmount: true,
                verifiedStatus: true,
                crId: true,
                adminId: true,
                // Exclude documentation as it could be large
                documentation: false
            }
        });
    }catch(err){
        console.log("error getting cp from prisma data", err);
        throw err; // Re-throw to handle in the route
    }
}

// Add a new function to get a single charity programme with all data
export async function getCharityProgrammeById(causeId: string) {
    try {
        return await prisma.charityProgramme.findUnique({
            where: { causeId }
        });
    } catch(err) {
        console.log("error getting specific charity programme", err);
        throw err;
    }
}

export async function CharityProgrammeUpdate(causeId: string, c: CharityProgramme){
    try{
        // Validate base64 data if present
        if (c.image && !c.image.startsWith('data:image/')) {
            throw new Error('Invalid image format. Base64 image data required');
        }

        if (c.documentation && !c.documentation.startsWith('data:application/pdf')) {
            throw new Error('Invalid documentation format. Base64 PDF data required');
        }

        const updatedCp = await prisma.charityProgramme.update({
            where:{ causeId: causeId },
            data:{
                title: c.title,
                description: c.description,
                documentation: c.documentation, // This will store the base64 string
                date: c.date,
                category: c.category,
                location: c.location,
                image: c.image, // This will store the base64 string
                goalAmount: c.goalAmount,
                raisedAmount: c.raisedAmount,
                verifiedStatus: c.verifiedStatus,
                crId: c.crId,
                adminId: c.adminId
            }
        })
        console.log('Cp updated with files converted to base64');
        return updatedCp;
    }catch(err){
        console.log("error updating Cp", err);
        throw err; // Re-throw to handle in the route
    }
}