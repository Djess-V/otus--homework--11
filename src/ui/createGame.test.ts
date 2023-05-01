import { createUI } from "./createUI";
import { createGame } from "./createGame";

const sleep = (x: number) => new Promise((resolve) => setTimeout(resolve, x));

describe("createGame", () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement("div");
    element.classList.add(".wrapper");
    createUI(element);

    const buttonCreateField: HTMLButtonElement | null = element.querySelector(
      ".section__button_type_create-field"
    );

    const width = element.querySelector("[data-width]") as HTMLInputElement;
    const height = element.querySelector("[data-height]") as HTMLInputElement;

    width.value = "10";
    height.value = "10";

    buttonCreateField?.click();
  });

  it("is a function", () => {
    expect(createGame).toBeInstanceOf(Function);
  });

  it("checking the launch of the game with all dead cells", async () => {
    const buttonStart: HTMLButtonElement | null = element.querySelector(
      ".game__button_type_start-stop"
    );

    buttonStart?.click();

    const range: HTMLInputElement | null =
      element.querySelector(".section__range");
    const delay = Number(range?.value);

    await sleep(delay + 100);

    const gameMessage: HTMLButtonElement | null =
      element.querySelector(".game__message");

    expect(gameMessage?.style.opacity).toBe("1");
    expect(gameMessage?.innerHTML).toBe("Игра окончена!");

    await sleep(4000);

    expect(gameMessage?.style.opacity).toBe("0");
  }, 10000);

  it("сhecking game stops", async () => {
    const cells: NodeListOf<HTMLElement> =
      element.querySelectorAll(".row__cell");

    cells[1].click();
    cells[11].click();
    cells[21].click();

    const buttonStart: HTMLButtonElement | null = element.querySelector(
      ".game__button_type_start-stop"
    );

    buttonStart?.click();

    expect(buttonStart?.innerHTML).toBe("Остановить игру");

    const range: HTMLInputElement | null =
      element.querySelector(".section__range");
    const delay = Number(range?.value);

    await sleep(delay + 100);

    buttonStart?.click();

    expect(buttonStart?.innerHTML).toBe("Начать игру");
  });

  it("checking field changes during a game pause with corrected data", async () => {
    const cells: NodeListOf<HTMLElement> =
      element.querySelectorAll(".row__cell");

    cells[1].click();
    cells[11].click();
    cells[21].click();

    const buttonStart: HTMLButtonElement | null = element.querySelector(
      ".game__button_type_start-stop"
    );

    buttonStart?.click();

    const range: HTMLInputElement | null =
      element.querySelector(".section__range");
    const delay = Number(range?.value);

    await sleep(delay + 100);

    buttonStart?.click();

    const buttonCreateField: HTMLButtonElement | null = element.querySelector(
      ".section__button_type_create-field"
    );

    const width = element.querySelector("[data-width]") as HTMLInputElement;
    const height = element.querySelector("[data-height]") as HTMLInputElement;

    width.value = "5";
    height.value = "5";

    buttonCreateField?.click();

    expect(element.querySelector(".field__table")?.innerHTML).not.toBeNull();
    expect(element.querySelectorAll(".table__row")?.length).toBe(5);
    expect(element.querySelectorAll(".row__cell")?.length).toBe(25);
  });

  it("checking field changes during a game", async () => {
    const cells: NodeListOf<HTMLElement> =
      element.querySelectorAll(".row__cell");

    cells[1].click();
    cells[11].click();
    cells[21].click();

    const buttonStart: HTMLButtonElement | null = element.querySelector(
      ".game__button_type_start-stop"
    );

    buttonStart?.click();

    const range: HTMLInputElement | null =
      element.querySelector(".section__range");
    const delay = Number(range?.value);

    await sleep(delay + 100);

    const buttonCreateField: HTMLButtonElement | null = element.querySelector(
      ".section__button_type_create-field"
    );

    const width = element.querySelector("[data-width]") as HTMLInputElement;
    const height = element.querySelector("[data-height]") as HTMLInputElement;

    width.value = "5";
    height.value = "5";

    buttonCreateField?.click();

    await sleep(delay + 100);

    expect(element.querySelector(".field__table")?.innerHTML).not.toBeNull();
    expect(element.querySelectorAll(".table__row")?.length).toBe(5);
    expect(element.querySelectorAll(".row__cell")?.length).toBe(25);
  }, 10000);

  it("checking field changes during a game with uncorrected data", async () => {
    const cells: NodeListOf<HTMLElement> =
      element.querySelectorAll(".row__cell");

    cells[1].click();
    cells[11].click();
    cells[21].click();

    const buttonStart: HTMLButtonElement | null = element.querySelector(
      ".game__button_type_start-stop"
    );

    buttonStart?.click();

    const range: HTMLInputElement | null =
      element.querySelector(".section__range");
    const delay = Number(range?.value);

    await sleep(delay + 100);

    const buttonCreateField: HTMLButtonElement | null = element.querySelector(
      ".section__button_type_create-field"
    );

    const width = element.querySelector("[data-width]") as HTMLInputElement;
    const height = element.querySelector("[data-height]") as HTMLInputElement;

    width.value = "35";
    height.value = "5";

    buttonCreateField?.click();

    await sleep(delay + 100);

    expect(element.querySelector(".field__table")?.innerHTML).not.toBeNull();
    expect(element.querySelectorAll(".table__row")?.length).toBe(10);
    expect(element.querySelectorAll(".row__cell")?.length).toBe(100);

    await sleep(3100);

    const errorMessage: HTMLElement | null = element.querySelector(
      ".section__error-message"
    ) as HTMLElement;

    expect(errorMessage.style.opacity).toBe("0");
  }, 10000);
});
