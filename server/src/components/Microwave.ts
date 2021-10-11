import { v4 } from "uuid";

enum MicrowaveLine {
    EMBS2411AB = "EMBS2411AB",
    EMBD3010AS = "EMBD3010AS",
    EMOW1911AS = "EMOW1911AS"
}

enum MicrowaveMode {
    STANDART = "STANDART",
    UNFROST = "UNFROST",
}

interface IMicrowave {
    isOn: boolean;
    line: MicrowaveLine;
    mode: MicrowaveMode;
    id: string;
}

class Microwave implements IMicrowave {
    isOn = false;
    id = v4();
    mode = MicrowaveMode.STANDART;
    constructor(public line: MicrowaveLine) {}
}

export { IMicrowave, MicrowaveLine, MicrowaveMode }
export default Microwave;