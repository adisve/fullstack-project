import express, { Request, Response } from 'express';
import { getDb } from '../db/connection';

const recordRoutes = express.Router();

/**
 * Example route to display how to connect to a collecton,
 * find an item in the collection
 */
recordRoutes.route('/record').get((req: Request, res: Response) => {
    const db_connect = getDb();
    db_connect.collection('records').find({});
});

export default recordRoutes;
