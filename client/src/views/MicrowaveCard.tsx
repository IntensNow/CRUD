import { IMicrowave } from "../interfaces/Microwave";

interface IMicrowaveCardProps {
    mw: IMicrowave;
    changeIsOn: (mw: IMicrowave) => void;
    remove: (id: string) => void;
}

const MicrowaveCard = (props: IMicrowaveCardProps) => {
    const { mw, changeIsOn, remove } = props;
    return (
        <div className="microwave" key={mw.id} data-testid="mw-card">
            <div className="microwave__line">Line: {mw.line}</div>
            <button data-testid="mw-card-chainge-is-on" onClick={() => changeIsOn(mw)}>{mw.isOn ? "Выключить" : "Включить"}</button>
            <button data-testid="mw-card-remove" onClick={() => remove(mw.id)}>Удалить</button>
        </div>
    );
}

export default MicrowaveCard;

