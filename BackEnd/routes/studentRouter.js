import { Router } from "express";
import user from "../model/users_model.js";

const studentRouter = Router();


studentRouter.post("/info", async (req, res) => {
    //give info about the user that is loeegd in from the cookie
    const cookie = req.cookies.jwt;
    const user = await verifyCookie(cookie);
    //fetch from database
    const student = await user.findOne({ email: user.username });
    if (student) {
        res.json({ message: "cookie verified", student });
    }
    else {
        res.json({ message: "cookie not verified" });
    }

});

export default studentRouter;