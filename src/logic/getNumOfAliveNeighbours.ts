import { getCellState } from "./getCellState";

interface AliveNeighbours {
  (column: number, row: number, field: number[][]): number;
}

// Получить количество соседей для ячейки.
const getNumOfAliveNeighbours: AliveNeighbours = (column, row, field) => {
  let neighbours = 0;

  for (let j = column - 1; j <= column + 1; j += 1) {
    neighbours += Number(getCellState(field, j, row - 1));
  }

  for (let j = column - 1; j <= column + 1; j += 1) {
    neighbours += Number(getCellState(field, j, row + 1));
  }

  neighbours += Number(getCellState(field, column - 1, row));
  neighbours += Number(getCellState(field, column + 1, row));

  return neighbours;
};

export { getNumOfAliveNeighbours };
