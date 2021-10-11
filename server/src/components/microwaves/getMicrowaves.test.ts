import getMicrowaves from "./getMicrowaves";

describe("deleteMicrowave", () => {
    it("should invoke db method read() once", async () => {
        const db = { read: jest.fn() }
        await getMicrowaves(db);
        expect(db.read).toHaveBeenCalledTimes(1);
    })
    it("should return result of db method read()", async () => {
        const result: any = [];
        const db = { read: jest.fn(() => result) };
        const returnedResult = await getMicrowaves(db);
        expect(returnedResult).toEqual(result);
    })
})