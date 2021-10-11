import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { MicrowaveLine } from '../enums';
import { IMicrowave } from '../interfaces/Microwave';
import { emitClick } from '../utils/testUtils';
import MicrowaveCard from './MicrowaveCard';

afterAll(() => {
    cleanup();
})

describe("MicrowaveCard", () => {
    test('should render', () => {
        const testMw: IMicrowave = { line: MicrowaveLine["EMBS2411AB"], isOn: false, id: "231" };
        const emptyHandler = () => {};
        render(<MicrowaveCard mw={testMw} changeIsOn={emptyHandler} remove={emptyHandler}/>);
        const mwCardElement = screen.getByTestId("mw-card");
        expect(mwCardElement).toBeInTheDocument();
      });

    test('should invoke changeIsOn with spec arg if clicked', async () => {
        const testMw: IMicrowave = { line: MicrowaveLine["EMBS2411AB"], isOn: false, id: "231" };
        const emptyHandler = () => {};
        const changeIsOnHandler = jest.fn((mw: IMicrowave) => {})
        render(<MicrowaveCard mw={testMw} changeIsOn={changeIsOnHandler} remove={emptyHandler}/>);
        const mwCardChangeIsOnElement = screen.getByTestId("mw-card-chainge-is-on");
        fireEvent(
            mwCardChangeIsOnElement,
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
            }),
          )
        
        expect(changeIsOnHandler).toBeCalledTimes(1);  
        expect(changeIsOnHandler.mock.calls[0][0]).toEqual(testMw);
      });

      test('should invoke remove with spec arg if clicked', async () => {
        const testMw: IMicrowave = { line: MicrowaveLine["EMBS2411AB"], isOn: false, id: "231" };
        const emptyHandler = () => {};
        const removeHandler = jest.fn((id: string) => {})
        render(<MicrowaveCard mw={testMw} changeIsOn={emptyHandler} remove={removeHandler}/>);
        const mwCardChangeIsOnElement = screen.getByTestId("mw-card-remove");
        emitClick(mwCardChangeIsOnElement);
        
        expect(removeHandler).toBeCalledTimes(1);  
        expect(removeHandler.mock.calls[0][0]).toEqual(testMw.id);
      });
});

