import Microwave, { MicrowaveLine } from "components/Microwave";
import createMicrowave from "./createMicrowave";


describe("createMicrowave", () => {
    it("should invoke db method add() with Microwave instance created", async () => {
        const microwave = new Microwave(MicrowaveLine["EMBS2411AB"]);
        const db = { async add(){ return microwave } };

        const result = await createMicrowave(db, MicrowaveLine["EMBS2411AB"])
        expect(result).toMatchObject(microwave);
    })
})