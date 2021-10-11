import Microwave, { MicrowaveLine } from "components/Microwave"

export default async (db: any, line: MicrowaveLine) => await db.add(new Microwave(line));
