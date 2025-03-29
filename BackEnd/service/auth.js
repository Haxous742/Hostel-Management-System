import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()



async function generateCookie(user,role){

    const payload={username:user.username,role:role}
    return jwt.sign(payload,process.env.JWT_SECRET_KEY);

}


async function verifyCookie(cookie){
    if(!cookie) return null;
    try{
        return jwt.verify(cookie,process.env.JWT_SECRET_KEY);
    }
    catch{
        return null;
    }
}

export { generateCookie, verifyCookie };