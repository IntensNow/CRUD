import Microwave, { MicrowaveLine } from "components/Microwave";
import createMicrowave from "./createMicrowave";
import deleteMicrowave from "./deleteMicrowave";


describe("deleteMicrowave", () => {
    it("should invoke db method delete() once", async () => {
        const id = "123";
        const db = { delete: jest.fn() }
        await deleteMicrowave(db, id);
        expect(db.delete).toHaveBeenCalledTimes(1);
    })
    it("should invoke db method delete() with specified id", async () => {
        const id = "123";
        const db = { delete: jest.fn() }
        await deleteMicrowave(db, id);
        expect(db.delete.mock.calls[0][0]).toBe(id);
    })
})