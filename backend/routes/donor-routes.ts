import { DonorAdd, DonorDelete, DonorUpdate, getAllDonors } from "../database/donors-data-store";
import express from "express";
import Donors from "../model/Donors"

const router = express.Router();

router.post("/add/:email", async(req, res) => {
    console.log(req.body);
    const email: string = req.params.email;
    const donor: Donors= req.body;
    try{
        const addedDonors = await DonorAdd(email, donor);
        res.json(addedDonors);
    }catch(err){
        console.log("error adding donor", err);
        res.status(400).send("error adding donor");
    }
})

router.delete("/delete/:donorId", async (req, res) => {
    const donorId: string  = req.params.donorId;
    try{
        const deletedDonor = await DonorDelete(donorId);
        res.json(deletedDonor);
    }catch(err){
        console.log("error deleting donor", err);
    }
})


router.put("/update/:donorId",async (req, res) => {
    const donorId: string = req.params.donorId;
    const donor : Donors = req.body;

    try{
        const updatedDonor = await DonorUpdate(donorId, donor);
        res.json(updatedDonor);
    }catch(err){
        console.log("error updating donor", err);
    }
})

router.get("/view", async (req, res) => {
    try{
        const donor=  await getAllDonors();
        res.json(donor);
    }catch(err){
        console.log("error getting donors", err);
    }
})

export default router;