import express, { Request, Response } from "express";
import userRoutes from "./routes/user-routes";
import adminRoutes from "./routes/admin-routes";
import donorRoutes from "./routes/donor-routes";
import charityRepresentativeRoutes from "./routes/charityRepresentative-routes";
import donationRoutes from "./routes/donation-routes";
import charityProgrammeRoutes from "./routes/charityProgramme-routes";
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type');

    next();
})

app.use('/user',userRoutes);
app.use('/admin',adminRoutes);
app.use('/donor',donorRoutes);
app.use('/charityRepresentative',charityRepresentativeRoutes);
app.use('/donation',donationRoutes);
app.use('/charityProgramme',charityProgrammeRoutes);

app.use(express.json({ limit: '100mb' })); // Increase the JSON payload limit
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.listen(3000, (err=>{
    console.log("Server running on port 3000");
}));

app.use('/',(req,res,next)=>{
    res.status(404).send('Not Found');
})
