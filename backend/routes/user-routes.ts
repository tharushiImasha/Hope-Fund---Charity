import { UserAdd, UserDelete, getAllUsers, UserUpdate } from "../database/user-data-store";
import express from "express";
import User from "../model/User"

const router = express.Router();

router.post("/add", async(req, res) => {
    console.log(req.body);
    const user: User= req.body;
    try{
        const addedUser = await UserAdd(user);
        res.json(addedUser);
    }catch(err){
        console.log("error adding user", err);
        res.status(400).send("error adding user");
    }
})

router.delete("/delete/:email", async (req, res) => {
    const email: string  = req.params.email;
    try{
        const deletedUser = await UserDelete(email);
        res.json(deletedUser);
    }catch(err){
        console.log("error deleting user", err);
    }
})


router.put("/update/:email",async (req, res) => {
    const email: string = req.params.email;
    const user : User = req.body;

    try{
        const updatedUser = await UserUpdate(email, user);
        res.json(updatedUser);
    }catch(err){
        console.log("error updating user", err);
    }
})

router.get("/view", async (req, res) => {
    try{
        const user=  await getAllUsers();
        res.json(user);
    }catch(err){
        console.log("error getting users", err);
    }
})

export default router;