import { drawField } from "./drawField";

describe("drawField", () => {
  let handleClickOnCell: (x: number, y: number) => void;
  let element: HTMLElement;

  beforeEach(() => {
    handleClickOnCell = jest.fn();
    element = document.createElement("div");
  });

  it("renders dead field 1x1", () => {
    drawField(element, [[0]], handleClickOnCell);
    expect(element.querySelectorAll(".row__cell").length).toBe(1);
    expect(element.querySelectorAll(".row__cell_type_dead").length).toBe(1);
  });

  it("renders alive field 1x1", () => {
    drawField(element, [[1]], handleClickOnCell);
    expect(element.querySelectorAll(".row__cell").length).toBe(1);
    expect(element.querySelectorAll(".row__cell_type_alive").length).toBe(1);
  });

  it("renders field mxn", () => {
    const field = [
      [0, 0, 0],
      [0, 0, 1],
      [1, 1, 0],
    ];
    drawField(element, field, handleClickOnCell);
    expect(element.querySelectorAll(".row__cell").length).toBe(9);
    expect(element.querySelectorAll(".row__cell_type_alive").length).toBe(3);
    expect(element.querySelectorAll(".row__cell_type_dead").length).toBe(6);
  });

  describe("handleClickOnCell", () => {
    it("calls handleClickOnCell on cell click", () => {
      const field = [
        [0, 0, 0],
        [0, 0, 1],
        [1, 1, 0],
      ];
      drawField(element, field, handleClickOnCell);
      const cell1: HTMLElement | null = element.querySelector(
        '.row__cell[data-x="1"][data-y="2"]'
      );
      cell1?.click();
      expect(handleClickOnCell).toHaveBeenCalledWith(1, 2);

      const cell2: HTMLElement | null = element.querySelector(
        '.row__cell[data-x="2"][data-y="0"]'
      );
      cell2?.click();
      expect(handleClickOnCell).toHaveBeenCalledWith(2, 0);
    });

    it("calls handleClickOnCell only once on multiple drawing", () => {
      const field = [
        [0, 0, 0],
        [0, 0, 1],
        [1, 1, 0],
      ];
      drawField(element, field, handleClickOnCell);
      drawField(element, field, handleClickOnCell);
      const cell1: HTMLElement | null = element.querySelector(
        '.row__cell[data-x="1"][data-y="2"]'
      );
      cell1?.click();
      expect(handleClickOnCell).toHaveBeenCalledWith(1, 2);
      expect(handleClickOnCell).toHaveBeenCalledTimes(1);
    });
  });
});
