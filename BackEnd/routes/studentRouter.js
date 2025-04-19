import { Router } from "express";
import user from "../model/users_model.js";
import Complaint from "../model/complaints_model.js";
import { verifyCookie } from "../service/auth.js";
import Rating from "../model/rating_model.js";
import Menu from "../model/menu_model.js";
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






studentRouter.post("/menu/rate", async (req, res) => {
    const cookie = req.cookies.jwt;
    const userData = await verifyCookie(cookie);
  
    if (!userData) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const { day, ratings } = req.body;
  
    if (!day || !ratings || typeof ratings !== 'object') {
      return res.status(400).json({ message: "Invalid input data" });
    }
  
    try {
      const student = await user.findOne({ email: userData.email }); // Changed from User to user
      if (!student) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Transform flat ratings to nested structure
      const nestedRatings = {
        breakfast: ratings.breakfast?.map(item => ({ foodItem: item.foodItem, rating: item.rating || 0 })) || [],
        lunch: ratings.lunch?.map(item => ({ foodItem: item.foodItem, rating: item.rating || 0 })) || [],
        snacks: ratings.snacks?.map(item => ({ foodItem: item.foodItem, rating: item.rating || 0 })) || [],
        dinner: ratings.dinner?.map(item => ({ foodItem: item.foodItem, rating: item.rating || 0 })) || [],
      };
  
      const update = {
        userId: student._id,
        day,
        ...nestedRatings,
      };
  
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      const rating = await Rating.findOneAndUpdate(
        { userId: student._id, day },
        update,
        options
      );
  
      res.status(201).json({ message: "Ratings submitted successfully", ratingId: rating._id });
    } catch (error) {
      console.error("Error submitting ratings:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  









  studentRouter.get("/menu/rate/:day", async (req, res) => {
    const cookie = req.cookies.jwt;
    const userData = await verifyCookie(cookie);
  
    if (!userData) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const { day } = req.params;
  
    try {
      const student = await user.findOne({ email: userData.email }); // Changed from User to user
      if (!student) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const rating = await Rating.findOne({ userId: student._id, day });
      if (!rating) {
        return res.status(404).json({ message: "No ratings found for this day" });
      }
  
      res.json({ message: "Ratings retrieved successfully", ratings: rating });
    } catch (error) {
      console.error("Error retrieving ratings:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });















  
  
  studentRouter.get("/menu", async (req, res) => {
    const cookie = req.cookies.jwt;
    const userData = await verifyCookie(cookie);
  
    if (!userData) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const menu = await Menu.find();
      if (!menu || menu.length === 0) {
        return res.status(404).json({ message: "No menu data found" });
      }
      res.json({ message: "Menu retrieved successfully", menu });
    } catch (error) {
      console.error("Error retrieving menu:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  export default studentRouter;
