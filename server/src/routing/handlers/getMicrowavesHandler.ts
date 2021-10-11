import getMicrowaves from 'components/microwaves/getMicrowaves';
import { Request, Response } from 'express';

export default (db: any) => async (req: Request, res: Response) => {
    const microwaves = await getMicrowaves(db);
    res.status(200).json(microwaves);
}