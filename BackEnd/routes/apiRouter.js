import { Router } from "express";
import {generateCookie} from "../service/auth.js";
import { verifyCookie } from "../service/auth.js";
import user_model from "../model/users_model.js";

const apiRouter = Router();


apiRouter.post("/login", async (req, res) => {

   console.log(req.body)
    const { email, name, token } = req.body;
    const user = await user_model.findOne({ email });
    
    if (!user) {
        res.json({ message: "user not in database",route: "/signup" });
    }
    else {
        console.log(user)
        const cookie = await generateCookie(user, user.role);
        console.log(cookie);
        res.cookie("jwt", cookie, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        res.json({ message: "login successfull", route: "/dashboard" });
    
    }

});

apiRouter.post("/signup", async (req, res) => {
    console.log(req.body)
    const { email, name, token,phone,parentEmail,parentPhone,roomNumber,avatarURL,gender,dob,batch } = req.body;
    //cheking if anything is empty
    if(!email || !name || !token || !phone || !parentEmail ||!parentPhone || !roomNumber || !gender || !dob || !batch){
        res.status(400);
        res.json({ message: "all fields required" });
        
    }
    else{
        const user = await user_model.findOne({ email });
        if (user) {
            res.json({ message: "user already in database" });
        }
        else {
            const newUser = new user_model({
                email,
                name,
                role: "student",
            });
            await newUser.save();
            res.json({ message: "user created" });
        }
    }
});


apiRouter.post("/verify", async (req, res) => {
    const cookie = req.cookies.jwt;
    const user = await verifyCookie(cookie);
    if (user) {
        res.json({ message: "cookie verified", user });
    }
    else {
        res.json({ message: "cookie not verified" });
    }
});



apiRouter.post('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.json({ message: "Logged out successfully" });
});
  



import studentRouter from "./studentRouter.js";
apiRouter.use("/student", studentRouter);


export default apiRouter;