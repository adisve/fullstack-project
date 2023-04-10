import express, { Request, Response } from 'express';
import {login} from '../server'
const recordLogin = express.Router();

recordLogin.post('/',async (req: Request, res: Response) => {
  console.log("in login")
  login(req, res);
  
}) 

export default recordLogin
