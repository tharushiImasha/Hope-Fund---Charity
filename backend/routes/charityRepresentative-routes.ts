import { CharityRepresentativeAdd, CharityRepresentativeDelete, CharityRepresentativeUpdate, getAllCharityRepresentatives } from "../database/charityRepresentative-data-store";
import express from "express";
import CharityRepresentative from "../model/CharityRepresentative"

const router = express.Router();

router.post("/add", async(req, res) => {
    console.log(req.body);
    const cr: CharityRepresentative= req.body;
    try{
        const addedCr = await CharityRepresentativeAdd(cr);
        res.json(addedCr);
    }catch(err){
        console.log("error adding cr", err);
        res.status(400).send("error adding cr");
    }
})

router.delete("/delete/:crId", async (req, res) => {
    const crId: string  = req.params.crId;
    try{
        const deletedCr = await CharityRepresentativeDelete(crId);
        res.json(deletedCr);
    }catch(err){
        console.log("error deleting cr", err);
    }
})


router.put("/update/:crId",async (req, res) => {
    const crId: string = req.params.crId;
    const cr : CharityRepresentative = req.body;

    try{
        const updatedCr = await CharityRepresentativeUpdate(crId, cr);
        res.json(updatedCr);
    }catch(err){
        console.log("error updating cr", err);
    }
})

router.get("/view", async (req, res) => {
    try{
        const cr=  await getAllCharityRepresentatives();
        res.json(cr);
    }catch(err){
        console.log("error getting cr", err);
    }
})

export default router;