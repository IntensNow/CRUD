export default async (db: any, id:string, model: any) => await db.update(id, model);
