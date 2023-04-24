import { drawField } from "./drawField";
import { isAnyoneAlive } from "../logic/isAnyoneAlive";
import { getNextState } from "../logic/getNextState";

interface CreateGame {
  (width: number, height: number, element: HTMLElement): void;
}

// Создание поля игры и прикрепление обработчиков.
const createGame: CreateGame = (width, height, element) => {
  let gameIsUpRunning = false;
  let timer: NodeJS.Timer;

  // Добавление обработчика событий, для изменения скорости игры.
  const range = element.querySelector(".section__range") as HTMLInputElement;
  let delay = Number(range.value);

  range.addEventListener("input", () => {
    delay = Number(range.value);
    if (buttonStart.innerHTML === "Остановить игру") {
      buttonStart.click();
      buttonStart.click();
    }
  });

  // Остановка игры.
  const stopGame = () => {
    gameIsUpRunning = false;
    buttonStart.innerHTML = "Начать игру";

    clearInterval(timer);
  };

  // Запуск игры.
  const startGame = () => {
    gameIsUpRunning = true;
    buttonStart.innerHTML = "Остановить игру";

    timer = setInterval(() => {
      field = getNextState(field);

      drawField(gameField, field, handleClickOnCell);

      if (!isAnyoneAlive(field)) {
        stopGame();

        const gameMessage = element.querySelector(
          ".game__message"
        ) as HTMLElement;

        gameMessage.style.opacity = "1";

        setTimeout(() => {
          gameMessage.style.opacity = "0";
        }, 3000);
      }
    }, delay);
  };

  // Функция обработки нажатия на кнопку Start/Stop.
  const handlerClickButtonStart = (): void => {
    if (!gameIsUpRunning) {
      startGame();
    } else {
      stopGame();
    }
  };

  const gameField = element.querySelector(".game__field") as HTMLElement;

  const buttonStart = element.querySelector(
    ".game__button_type_start-stop"
  ) as HTMLElement;

  // Создание поля.
  let field = Array.from({ length: height }).map(() =>
    Array.from({ length: width }).fill(0)
  ) as number[][];

  // Функция для обработки нажатия на ячейку поля.
  const handleClickOnCell = (x: number, y: number): void => {
    field[y][x] = field[y][x] === 0 ? 1 : 0;
    drawField(gameField, field, handleClickOnCell);
  };

  // Функция для обработки изменения размеров поля.
  const changeSizesField = () => {
    const newWidth = element.querySelector("[data-width]") as HTMLInputElement;
    const newHeight = element.querySelector(
      "[data-height]"
    ) as HTMLInputElement;

    if (
      !newWidth.value ||
      !newHeight.value ||
      Number(newWidth.value) < 1 ||
      Number(newWidth.value) > 30 ||
      Number(newHeight.value) < 1 ||
      Number(newHeight.value) > 30
    ) {
      const errorMessage = element.querySelector(
        ".section__error-message"
      ) as HTMLElement;

      errorMessage.style.opacity = "1";

      setTimeout(() => {
        errorMessage.style.opacity = "0";
      }, 3000);
    } else {
      const valueWidth = Number(newWidth.value);
      const valueHeight = Number(newHeight.value);

      const newield = Array.from({ length: valueHeight }).map(() =>
        Array.from({ length: valueWidth }).fill(0)
      ) as number[][];

      field = newield.map((row, x) =>
        row.map((cell, y) => {
          if (field?.[x]?.[y] && field[x][y] === 1) {
            return 1;
          } else if (field?.[x]?.[y] && field[x][y] === -1) {
            return -1;
          }

          return 0;
        })
      );

      if (buttonStart.innerHTML === "Начать игру") {
        drawField(gameField, field, handleClickOnCell);
      }

      newWidth.value = "";
      newHeight.value = "";
    }
  };

  const buttonCreateField = element.querySelector(
    ".section__button_type_create-field"
  ) as HTMLElement;

  buttonCreateField.addEventListener("click", changeSizesField);

  drawField(gameField, field, handleClickOnCell);

  buttonStart.addEventListener("click", handlerClickButtonStart);
};

export { createGame };
