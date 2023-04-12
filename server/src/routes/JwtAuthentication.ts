import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
const secretKey: string = process.env.SECRET_KEY || '';

interface userPayload {
  name: String;
  password: String;
}

declare global {
  namespace Express {
    interface Request{
      user?: userPayload
   
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  let token = req.session?.jwt
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(' ')[1]
    //logs so you see what's happening
    console.log('auth bearer token')
    console.log({ token })
  }
  else {
    token = req.headers["x-access-token"] || null
    //logs
    console.log('our token is from x-access-token header, a cookie or null')
    console.log({ token })
 
    if (!req.session?.jwt) {
      console.log("session token is not available")
      return next()
    }
    try {
 
      const userPayload = jwt.verify(req.session.jwt, secretKey) as userPayload
      req.user = userPayload;

      console.log("In jwt verification")
    } catch (err) {
      console.log("jwt cannot be verified")
    
    }
    next()
  }
}
