import express, { Request, Response } from 'express';
const recordRoutes = express.Router();
import { Router } from 'express';
import { currentUser } from './JwtAuthentication';
const app = express()

const routee = Router();


recordRoutes.get('/', currentUser, async (req: Request, res: Response) => {
  console.log("in current user ")
  res.send({ currentUser: req.user || null});
  
})


routee.use('/users/currentUser', recordRoutes);

export default routee;