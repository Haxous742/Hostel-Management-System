
// admin router
import { Router } from "express";
import LeaveRequest from "../model/leave_model.js";
import user from "../model/users_model.js";

const adminRouter = Router();



adminRouter.get("/complaints", (req, res) => {

})


adminRouter.post("/complaints/discard", (req, res) => {

})



adminRouter.post("/complaints/completed", (req, res) => {

})


adminRouter.get("/leave", async (req, res) => {
    try {
      const leaves = await LeaveRequest.find()
        .populate("userId", "name email phone roomNumber gender batch") // Populate userId field with specific fields
        .sort({ startDate: -1 }); // Sort leave requests by start date (descending)
        console.log(leaves)
      res.status(200).json(leaves); // Return the populated leave requests in the response
    } catch (error) {
      console.error("Error fetching leave applications:", error);
      res.status(500).json({ message: "Failed to fetch leave applications" });
    }
  });
  


adminRouter.post("/leave/reject", (req, res) => {

})



adminRouter.post("/leave/accept", (req, res) => {



});






export default adminRouter;