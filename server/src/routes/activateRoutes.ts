import { Router } from 'express';
import recordRoutes from './record';


const route = Router();

route.use('/register', recordRoutes);

export default route;
