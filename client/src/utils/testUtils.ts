import { fireEvent } from "@testing-library/dom"

const emitClick = (elem: HTMLElement) => {
    fireEvent(
        elem,
            new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            }),
        )
}

export { emitClick };