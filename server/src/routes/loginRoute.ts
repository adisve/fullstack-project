import express, { Request, Response } from 'express';
import {login} from '../server'
const recordLogin = express.Router();
import { Router } from 'express';

const routes = Router();
recordLogin.post('/',async (req: Request, res: Response) => {
  console.log("in login")
  login(req, res);
  
}) 
routes.use('/login', recordLogin);

export default routes;

// export default recordLogin
