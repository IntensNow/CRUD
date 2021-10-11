import Microwave, { IMicrowave } from "components/Microwave";
import { promises as fs }  from "fs"
const BDPATH = "src/db/db.json";

class DataBase {
    async read() {
        const result = await fs.readFile(BDPATH, "utf-8");
        return JSON.parse(result);
    }

    async write(data: [] | object) {
        await fs.writeFile(BDPATH, JSON.stringify(data))
    }

    async add(model: IMicrowave) {
        const current = await this.read();
        current.push(model);
        await this.write(current);
        return model
    }

    async delete(id: string) {
        const current = await this.read();
        let newList = current.filter((m: IMicrowave) => m.id !== id);
        await this.write(newList);
    }

    async update(id: string, updatedModel: Microwave) {
        const current = await this.read();
        let oldModel : Microwave = current.find((m: Microwave) => m.id === id);
        
        if(!oldModel) {
            throw new Error("Модели с таким id не существует. Удаление отменено.");
        }

        let newModel: IMicrowave = { ...oldModel, ...updatedModel };
        let newList = current.map((m: IMicrowave) => m.id === id ? newModel : m);
        await this.write(newList);
        return newModel;
    }
}

export default new DataBase()