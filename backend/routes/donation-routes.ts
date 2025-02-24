import { DonationAdd, DonationDelete, DonationUpdate, getAllDonations } from "../database/donation-data-store";
import express from "express";
import Donation from "../model/Donation"

const router = express.Router();

router.post("/add", async(req, res) => {
    console.log(req.body);
    const donation: Donation= req.body;
    try{
        const addedDonation = await DonationAdd(donation);
        res.json(addedDonation);
    }catch(err){
        console.log("error adding donation", err);
        res.status(400).send("error adding donation");
    }
})

router.delete("/delete/:donationId", async (req, res) => {
    const donationId: string  = req.params.donationId;
    try{
        const deletedDonation = await DonationDelete(donationId);
        res.json(deletedDonation);
    }catch(err){
        console.log("error deleting donation", err);
    }
})


router.put("/update/:donationId",async (req, res) => {
    const donationId: string = req.params.donationId;
    const donation : Donation = req.body;

    try{
        const updatedDonation = await DonationUpdate(donationId, donation);
        res.json(updatedDonation);
    }catch(err){
        console.log("error updating donation", err);
    }
})

router.get("/view", async (req, res) => {
    try{
        const donation=  await getAllDonations();
        res.json(donation);
    }catch(err){
        console.log("error getting donations", err);
    }
})

export default router;