import { Router } from "express";
import user from "../model/users_model.js";
import Complaint from "../model/complaints_model.js";
import { verifyCookie } from "../service/auth.js";

const studentRouter = Router();

studentRouter.get("/info", async (req, res) => {
    const cookie = req.cookies.jwt;
    const userData = await verifyCookie(cookie);
    const student = await user.findOne({ email: userData.username });

    if (student) {
        res.json({ message: "cookie verified", student });
    } else {
        res.json({ message: "cookie not verified" });
    }
});

// POST a new complaint
studentRouter.post("/complaints/new", async (req, res) => {
    const cookie = req.cookies.jwt;
    const { category, text } = req.body;

    try {
        const userData = await verifyCookie(cookie);
        const student = await user.findOne({ email: userData.email });

        if (!student) {
            return res.status(401).json({ message: "User not found" });
        }

        const newComplaint = new Complaint({
            userEmail: student.email,
            category,
            text,
            date: new Date().toLocaleDateString(),
            status: "Pending",
        });

        await newComplaint.save();

        res.status(200).json({ message: "Complaint submitted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// GET all complaints of a user
studentRouter.get("/complaints/show", async (req, res) => {
    
    const cookie = req.cookies.jwt;
    

    try {
        const userData = await verifyCookie(cookie);
        const student = await user.findOne({ email: userData.email });
       
        if (!student) {
            return res.status(401).json({ message: "User not found" });
        }
        const complaints = await Complaint.find({ userEmail: student.email }).sort({ date: -1 });
        
        res.status(200).json(complaints);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});





export default studentRouter;
