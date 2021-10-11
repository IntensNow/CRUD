import { Request, Response } from 'express';

export default (db: any) => async (req: Request, res: Response) => {
    await db.delete(req.params.id)
    res.status(200).json({message: "Успешное удаление"});
}