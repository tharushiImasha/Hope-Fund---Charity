import { AdminAdd, AdminDelete, AdminUpdate, getAllAdmins } from "../database/admin-data-store";
import express from "express";
import Admin from "../model/Admin"

const router = express.Router();

router.post("/add/:email", async(req, res) => {
    console.log(req.body);
    const email: string = req.params.email;
    const admin: Admin= req.body;
    try{
        const addedAdmin = await AdminAdd(email, admin);
        res.json(addedAdmin);
    }catch(err){
        console.log("error adding admin", err);
        res.status(400).send("error adding admin");
    }
})

router.delete("/delete/:adminId", async (req, res) => {
    const adminId: string  = req.params.adminId;
    try{
        const deletedAdmin = await AdminDelete(adminId);
        res.json(deletedAdmin);
    }catch(err){
        console.log("error deleting admin", err);
    }
})


router.put("/update/:adminId",async (req, res) => {
    const adminId: string = req.params.adminId;
    const admin : Admin = req.body;

    try{
        const updatedAdmin = await AdminUpdate(adminId, admin);
        res.json(updatedAdmin);
    }catch(err){
        console.log("error updating admin", err);
    }
})

router.get("/view", async (req, res) => {
    try{
        const admin=  await getAllAdmins();
        res.json(admin);
    }catch(err){
        console.log("error getting admins", err);
    }
})

export default router;