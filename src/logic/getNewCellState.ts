interface NewCellState {
  (current: number, count: number): number;
}

// Получить текущее новое состояние ячейки.
const getNewCellState: NewCellState = (
  currentCellState,
  countOfAliveNeighbours
) => {
  if (countOfAliveNeighbours === 3) {
    return 1;
  }
  if (countOfAliveNeighbours > 3 || countOfAliveNeighbours < 2) {
    return 0;
  }
  if (countOfAliveNeighbours === 2 && currentCellState === 1) {
    return 1;
  }
  return 0;
};

export { getNewCellState };
