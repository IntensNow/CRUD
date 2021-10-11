import { Application } from "express"
import createMicrowaveHandler from "./handlers/createMicrowaveHandler";
import deleteMicrowaveHandler from "./handlers/deleteMicrowaveHandler";
import getMicrowavesHandler from "./handlers/getMicrowavesHandler";
import updateMicrowaveHandler from "./handlers/updateMicrowaveHandler";

const applyRouting = (app: Application, db: any) => {
    app.get("/microwaves", getMicrowavesHandler(db));
    app.post("/microwaves", createMicrowaveHandler(db));
    app.put("/microwaves/:id", updateMicrowaveHandler(db));
    app.delete("/microwaves/:id", deleteMicrowaveHandler(db));
}

export default applyRouting;