import { render, screen, waitFor } from '@testing-library/react';
import { MicrowaveLine } from '../enums';
import { IMicrowave } from '../interfaces/Microwave';
import request from '../utils/request';
import { emitClick } from '../utils/testUtils';
import MicrowavesController from './Microwaves.controller';

jest.mock("../utils/request");
const mRequest = request as jest.Mock;

describe("Microwaves controller", () => {
    test("should get mw list on mount", async () => {
        const testMw: IMicrowave = {
            line: MicrowaveLine["EMBS2411AB"],
            isOn:false,
            id:"71db2ad4-2eb9-47d6-b32b-107016104ac9"
        };
        mRequest.mockReturnValue([testMw]);

        render(<MicrowavesController />);
        
        expect(mRequest).toBeCalledTimes(1);

        const firstCall = mRequest.mock.calls[0];
        expect(firstCall[0]).toBe("/microwaves");
        expect(firstCall[1]).toBe("get");
        expect(firstCall[2]).toBe(undefined);

        await waitFor(() => {
            expect(screen.getByTestId('mw-list')).toBeInTheDocument();
        }); 
    })

    test("should create new mw", async () => {
        const testMw: IMicrowave = {
            line: MicrowaveLine["EMBS2411AB"],
            isOn:true,
            id:"73db2ad4-2eb9-4ad6-b32b-103456204ac9"
        };

        mRequest.mockReturnValue([]);
        render(<MicrowavesController defaultCreationLine={MicrowaveLine["EMBS2411AB"]}/>);
        const addBtn = screen.getByTestId("mw-add-btn");

        expect(addBtn).toBeInTheDocument();

        mRequest.mockReturnValue(testMw);
        emitClick(addBtn);

        expect(mRequest).toBeCalledTimes(2);

        const secondCall = mRequest.mock.calls[1];
        expect(secondCall[0]).toBe("/microwaves");
        expect(secondCall[1]).toBe("post");
        expect(secondCall[2]).toMatchObject({ line: MicrowaveLine["EMBS2411AB"] });

        await waitFor(() => {
            expect(screen.getByTestId('mw-list')).toBeInTheDocument();
        }); 
    })
})