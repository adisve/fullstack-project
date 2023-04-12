import express, { Request, Response } from 'express';
import { register } from '../server';
const recordRoutes = express.Router();
import { Router } from 'express';
const app = express()

const route = Router();


recordRoutes.post('/', async (req: Request, res: Response) => {
  console.log("in record register")
  register(req, res);
  
})


route.use('/register', recordRoutes);

export default route;


