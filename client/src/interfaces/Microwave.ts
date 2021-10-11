import { MicrowaveLine } from "../enums";

export interface IMicrowave {
    isOn: boolean;
    line: MicrowaveLine;
    id: string;
}