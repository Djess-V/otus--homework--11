import { getNumOfAliveNeighbours } from "./getNumOfAliveNeighbours";
import { getCellState } from "./getCellState";
import { getNewCellState } from "./getNewCellState";

interface GetNextState {
  (field: number[][], check?: boolean): number[][];
}

// Получить следующее состояние поля.
const getNextState: GetNextState = (field, check = false) => {
  let nextState = field.map((row, rowIndex) =>
    row.map((cell, columnIndex) => {
      const count = getNumOfAliveNeighbours(columnIndex, rowIndex, field);
      const currentState = getCellState(field, columnIndex, rowIndex);
      const newState = getNewCellState(currentState, count);
      return newState;
    })
  );

  if (check) {
    return nextState;
  }

  // Получить будущее состояние поля для того, чтобы узнать кто умрёт.
  const futureState = getNextState(nextState, true);

  nextState = nextState.map((row, x) =>
    row.map((cell, y) => {
      if (nextState[x][y] === 1 && futureState[x][y] === 0) {
        return -1;
      }

      return cell;
    })
  );
  return nextState;
};

export { getNextState };
