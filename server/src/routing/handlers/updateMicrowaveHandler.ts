import updateMicrowave from 'components/microwaves/updateMicrowave';
import { Request, Response } from 'express';

export default (db: any) => async (req: Request, res: Response) => {
    const updatedModel = await updateMicrowave(db, req.params.id, req.body)
    res.status(200).json(updatedModel);
}