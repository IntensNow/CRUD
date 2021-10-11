import React from "react";
import { Select } from 'antd';
import { IMicrowave } from "../interfaces/Microwave";
import MicrowaveCard from "../views/MicrowaveCard";
import request from "../utils/request";

const { Option } = Select;

enum MicrowaveLine {
    EMBS2411AB = "EMBS2411AB",
    EMBD3010AS = "EMBD3010AS",
    EMOW1911AS = "EMOW1911AS"
}

interface IMicrowaveProps {
    defaultCreationLine?: MicrowaveLine
}

interface IMicrowavesState {
    microwaves: IMicrowave[];
    creationLine: MicrowaveLine;
}

class MicrowavesController extends React.Component<IMicrowaveProps, IMicrowavesState> {
    static defaultProps = {
        defaultCreationLine: MicrowaveLine["EMBS2411AB"]
    }

    state = {
        microwaves: [],
        creationLine: MicrowaveLine["EMBS2411AB"]
    }

    constructor(props: IMicrowaveProps) {
        super(props);
        this.state.creationLine = props.defaultCreationLine || this.state.creationLine;
    }

    async componentDidMount() {
        //- send get
        const response = await request("/microwaves", "get");
        this.setState({ microwaves: response });
    }

    onCreationLineChange = (line: MicrowaveLine) => {
        this.setState({creationLine: line});
    }

    onAddButtonClick = async () => {
        //- send post request with line
        const newMw = await request("/microwaves", "post", { line: this.state.creationLine });
        this.setState({ microwaves: [ ...this.state.microwaves, newMw ] });
    }

    changeIsOn = async (mw: IMicrowave) => {
        //- send post request with line
        const changedMw = await request(`/microwaves/${mw.id}`, "put", {...mw, isOn: !mw.isOn});
        const { microwaves } = this.state;
        const newMicrowaves = microwaves.map((mw: IMicrowave) => mw.id === changedMw.id ? changedMw : mw);
        this.setState({microwaves: newMicrowaves});
    }

    remove = async (id: string) => {
        //- send post request with line
        const response = await request(`/microwaves/${id}`, "delete");
        if(response.message && response.message === "Успешное удаление") {
            const { microwaves } = this.state;
            const newMicrowaves = microwaves.filter((mw: IMicrowave) => mw.id !== id);
            this.setState({microwaves: newMicrowaves});
        }
        
    }

    render() {
        return <div className="microwaves">
            <div className="microwaves__creation">
                <Select defaultValue={MicrowaveLine["EMBS2411AB"]} onChange={this.onCreationLineChange}>
                    {Object.keys(MicrowaveLine).map(line => <Option value={line} key={line}>{line}</Option>)}
                </Select>
                <button onClick={this.onAddButtonClick} data-testid="mw-add-btn">Add microwave</button>
            </div>
            {this.state.microwaves.length && <div className="microwaves__list" data-testid="mw-list">
                {this.state.microwaves.map((mw: IMicrowave) => 
                    <div data-testid="mw-list-item" key={mw.id}><MicrowaveCard mw={mw} changeIsOn={this.changeIsOn} remove={this.remove}/></div>
                )}
            </div>}
            
        </div>
    }
}

export default MicrowavesController;