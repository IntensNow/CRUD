import Microwave, { MicrowaveLine } from "components/Microwave";
import updateMicrowave from "./updateMicrowave";

describe("deleteMicrowave", () => {
    it("should invoke db method update() once", async () => {
        const id = "232";
        const microwave = new Microwave(MicrowaveLine["EMBS2411AB"]);
        const db = { update: jest.fn() }
        await updateMicrowave(db, id, microwave);
        expect(db.update).toHaveBeenCalledTimes(1);
    })
    it("should return invoke db method update() with specify arguments", async () => {
        const id = "123";
        const microwave = new Microwave(MicrowaveLine["EMBS2411AB"]);
        const db = { update: jest.fn() };
        await updateMicrowave(db, id, microwave);
        expect(db.update.mock.calls[0][0]).toBe(id);
    })
    it("should return result from db method update()", async () => {
        const id = "123";
        const microwave = new Microwave(MicrowaveLine["EMBS2411AB"]);
        const result: any = [];
        const db = { update: jest.fn(() => result) };
        const returnedResult = await updateMicrowave(db, id, microwave);
        expect(returnedResult).toEqual(result);
    })
})