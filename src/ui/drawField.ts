interface DrawField {
  (
    element: HTMLElement,
    field: number[][],
    handleClickOnCell: (x: number, y: number) => void
  ): void;
}

interface RowIterator {
  (row: number[], index: number): string;
}

const drawField: DrawField = (element, field, handleClickOnCell) => {
  const rowIterator: RowIterator = (row, rowIndex) => {
    return `<tr class="table__row row">${row
      .map((cell, columnIndex) => {
        if (cell === 1) {
          return `<td 
         data-x=${columnIndex}
         data-y=${rowIndex}
         class="row__cell row__cell_type_alive"></td>`;
        } else if (cell === -1) {
          return `<td 
       data-x=${columnIndex}
       data-y=${rowIndex}
       class="row__cell row__cell_type_doomed" ></td>`;
        }
        return `<td 
       data-x=${columnIndex}
       data-y=${rowIndex}
       class="row__cell row__cell_type_dead" ></td>`;
      })
      .join("")}</tr>`;
  };

  const tableString = `<table class="field__table table">${field
    .map(rowIterator)
    .join("")}</table>`;

  element.innerHTML = `${tableString}`;

  const table = element.querySelector("table") as HTMLElement;

  table.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    if (target.tagName === "TD") {
      const x = target.getAttribute("data-x");

      const y = target.getAttribute("data-y");

      if (x && y && Number(x) >= 0 && Number(y) >= 0) {
        handleClickOnCell(Number(x), Number(y));
      }
    }
  });
};

export { drawField };
