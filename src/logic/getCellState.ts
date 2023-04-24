interface CellState {
  (field: number[][], x: number, y: number): number;
}

// Получить текущее состояние ячейки.
const getCellState: CellState = (field, x, y) => {
  const row = field[y];
  if (row === undefined) {
    return 0;
  }
  const cell = row[x];
  if (cell === undefined) {
    return 0;
  }
  if (cell === -1) {
    return 1;
  }
  return cell;
};

export { getCellState };
