import createMicrowave from 'components/microwaves/createMicrowave';
import { Request, Response } from 'express';

export default (db: any) => async (req: Request, res: Response) => {
    // - Создать микроволновку.
    const mw = await createMicrowave(db, req.body.line);
    // - Отправить статус
    res.status(200).json(mw);
}