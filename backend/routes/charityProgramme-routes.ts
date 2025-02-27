// import { CharityProgrammeAdd, CharityProgrammeDelete, CharityProgrammeUpdate, getAllCharityProgrammes } from "../database/charityProgramme-data-store";
// import express from "express";
// import { Request } from "express";
// import multer from "multer";
// import CharityProgramme from "../model/CharityProgramme"
//
// const router = express.Router();
//
// const storage = multer.memoryStorage();
// const upload = multer.fields([{ name: "image", maxCount: 1 }, { name: "documentation", maxCount: 1 }]);
//
// interface MulterRequest extends Request {
//     files?: {
//         image?: Express.Multer.File[];
//         documentation?: Express.Multer.File[];
//     };
// }
//
// router.post("/add", upload, async (req: MulterRequest, res) => {
//     try {
//         const { causeId, title, description, date, category, location, goalAmount, raisedAmount, verifiedStatus, crId, adminId } = req.body;
//
//         let imageBase64 = "";
//         let documentationBase64 = "";
//
//         if (req.files?.image) {
//             imageBase64 = req.files.image[0].buffer.toString("base64");
//         }
//
//         if (req.files?.documentation) {
//             documentationBase64 = req.files.documentation[0].buffer.toString("base64");
//         }
//
//         const cp: CharityProgramme = {
//             causeId,
//             title,
//             description,
//             documentation: documentationBase64,
//             date,
//             category,
//             location,
//             image: imageBase64,
//             goalAmount: parseFloat(goalAmount),
//             raisedAmount: parseFloat(raisedAmount),
//             verifiedStatus: verifiedStatus === "true",
//             crId,
//             adminId
//         };
//
//         const addedCp = await CharityProgrammeAdd(cp, imageBase64, documentationBase64);
//         res.json(addedCp);
//     } catch (err) {
//         console.error("Error adding charity programme:", err);
//         res.status(400).send("Error adding charity programme");
//     }
// });
//
//
// router.delete("/delete/:causeId", async (req, res) => {
//     const causeId: string  = req.params.causeId;
//     try{
//         const deletedCp = await CharityProgrammeDelete(causeId);
//         res.json(deletedCp);
//     }catch(err){
//         console.log("error deleting cp", err);
//     }
// })
//
//
// router.put("/update/:causeId",async (req, res) => {
//     const causeId: string = req.params.causeId;
//     const cp : CharityProgramme = req.body;
//
//     try{
//         const updatedCp = await CharityProgrammeUpdate(causeId, cp);
//         res.json(updatedCp);
//     }catch(err){
//         console.log("error updating cp", err);
//     }
// })
//
// router.get("/view", async (req, res) => {
//     try{
//         const cp =  await getAllCharityProgrammes();
//         res.json(cp);
//     }catch(err){
//         console.log("error getting cp", err);
//     }
// })
//
// export default router;


import express from "express";
import { Request, Response, Router } from "express";
import fileUpload from "express-fileupload";
import { PrismaClient } from '@prisma/client';
import CharityProgramme from "../model/CharityProgramme";
import {
    CharityProgrammeAdd,
    CharityProgrammeDelete,
    CharityProgrammeUpdate,
    getAllCharityProgrammes
} from "../database/charityProgramme-data-store";

const router = express.Router();
const prisma = new PrismaClient();

// Add file upload middleware
router.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
}));

// Type guard for file uploads
interface UploadedFile extends fileUpload.UploadedFile {
    data: Buffer;
    mimetype: string;
}

function isUploadedFile(file: any): file is UploadedFile {
    return file && 'data' in file && 'mimetype' in file;
}

router.post("/add", async(req: Request, res: Response) => {
    try {
        // Get form fields
        const {
            causeId, title, description, date, category,
            location, goalAmount, raisedAmount, verifiedStatus,
            crId, adminId
        } = req.body;

        // Handle file uploads and convert to base64
        let imageBase64 = '';
        let documentationBase64 = '';

        const files = req.files as fileUpload.FileArray | undefined;

        // Type-safe access to files
        if (files && 'image' in files) {
            const imageFile = files.image;
            if (Array.isArray(imageFile)) {
                // If multiple files were uploaded with the same name
                if (imageFile.length > 0 && isUploadedFile(imageFile[0])) {
                    imageBase64 = `data:${imageFile[0].mimetype};base64,${imageFile[0].data.toString('base64')}`;
                }
            } else if (isUploadedFile(imageFile)) {
                // Single file
                imageBase64 = `data:${imageFile.mimetype};base64,${imageFile.data.toString('base64')}`;
            }
        }

        if (files && 'documentation' in files) {
            const docFile = files.documentation;
            if (Array.isArray(docFile)) {
                // If multiple files were uploaded with the same name
                if (docFile.length > 0 && isUploadedFile(docFile[0])) {
                    documentationBase64 = `data:${docFile[0].mimetype};base64,${docFile[0].data.toString('base64')}`;
                }
            } else if (isUploadedFile(docFile)) {
                // Single file
                documentationBase64 = `data:${docFile.mimetype};base64,${docFile.data.toString('base64')}`;
            }
        }

        // Create CharityProgramme object
        const cp: CharityProgramme = {
            causeId,
            title,
            description,
            documentation: documentationBase64,
            date: new Date(date),
            category,
            location,
            image: imageBase64,
            goalAmount: parseFloat(goalAmount),
            raisedAmount: parseFloat(raisedAmount),
            verifiedStatus: 'Pending',
            crId,
            adminId
        };

        const addedCp = await CharityProgrammeAdd(cp);
        res.json(addedCp);
    } catch(err) {
        console.log("Error adding charity programme:", err);
        res.status(400).send("Error adding charity programme");
    }
});

// Fix for the update route
router.put("/update/:causeId", function(req: Request, res: Response) {
    const updateHandler = async () => {
        const causeId: string = req.params.causeId;

        try {
            // Get existing charity programme
            const existingCp = await prisma.charityProgramme.findUnique({
                where: { causeId },
            });

            // Check if the charity programme exists
            if (!existingCp) {
                return res.status(404).send("Charity programme not found");
            }

            // Create a new object with only the fields from CharityProgramme
            // Omit the id field which might have the ObjectId type
            const updatedCp: Partial<CharityProgramme> = {
                causeId: existingCp.causeId,
                title: req.body.title || existingCp.title,
                description: req.body.description || existingCp.description,
                date: req.body.date ? new Date(req.body.date) : existingCp.date,
                category: req.body.category || existingCp.category,
                location: req.body.location || existingCp.location,
                goalAmount: req.body.goalAmount ? parseFloat(req.body.goalAmount) : existingCp.goalAmount,
                raisedAmount: req.body.raisedAmount ? parseFloat(req.body.raisedAmount) : existingCp.raisedAmount,
                verifiedStatus: req.body.verifiedStatus || existingCp.verifiedStatus,
                crId: req.body.crId || existingCp.crId,
                adminId: req.body.adminId || existingCp.adminId,
                image: existingCp.image,
                documentation: existingCp.documentation,
            };

            // Handle file uploads and convert to base64
            const files = req.files as fileUpload.FileArray | undefined;

            // Update image if a new one is uploaded
            if (files && 'image' in files) {
                const imageFile = files.image;
                if (Array.isArray(imageFile)) {
                    if (imageFile.length > 0 && isUploadedFile(imageFile[0])) {
                        updatedCp.image = `data:${imageFile[0].mimetype};base64,${imageFile[0].data.toString('base64')}`;
                    }
                } else if (isUploadedFile(imageFile)) {
                    updatedCp.image = `data:${imageFile.mimetype};base64,${imageFile.data.toString('base64')}`;
                }
            }

            // Update documentation if a new one is uploaded
            if (files && 'documentation' in files) {
                const docFile = files.documentation;
                if (Array.isArray(docFile)) {
                    if (docFile.length > 0 && isUploadedFile(docFile[0])) {
                        updatedCp.documentation = `data:${docFile[0].mimetype};base64,${docFile[0].data.toString('base64')}`;
                    }
                } else if (isUploadedFile(docFile)) {
                    updatedCp.documentation = `data:${docFile.mimetype};base64,${docFile.data.toString('base64')}`;
                }
            }

            // Update the charity programme in the database
            const updatedCharityProgramme = await CharityProgrammeUpdate(causeId, updatedCp as CharityProgramme);
            res.json(updatedCharityProgramme);

        } catch (err) {
            console.error("Error updating charity programme:", err);
            res.status(500).send("Internal server error");
        }
    };

    // Execute the handler
    updateHandler().catch(err => {
        console.error("Unhandled error in update handler:", err);
        res.status(500).send("Internal server error");
    });
});

// Keep the other routes as they are
router.delete("/delete/:causeId", async (req: Request, res: Response) => {
    const causeId: string = req.params.causeId;
    try {
        const deletedCp = await CharityProgrammeDelete(causeId);
        res.json(deletedCp);
    } catch(err) {
        console.log("Error deleting charity programme:", err);
        res.status(400).send("Error deleting charity programme");
    }
});

router.get("/view", async (req: Request, res: Response) => {
    try {
        const cp = await getAllCharityProgrammes();
        res.json(cp);
    } catch(err) {
        console.log("Error getting charity programmes:", err);
        res.status(400).send("Error fetching charity programmes");
    }
});

export default router;