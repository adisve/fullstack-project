import { Router } from 'express';
import recordLogin  from './loginRoute';

const routes = Router();

routes.use('/login', recordLogin);

export default routes;
