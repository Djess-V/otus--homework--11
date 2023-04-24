import { createTerms } from "./createTerms";
import { createUI } from "./createUI";

const sleep = (x: number) => new Promise((resolve) => setTimeout(resolve, x));

describe("createTerms", () => {
  let element: HTMLElement;
  beforeEach(() => {
    element = document.createElement("div");
    element.classList.add(".wrapper");
    createUI(element);
  });

  it("is a function", () => {
    expect(createTerms).toBeInstanceOf(Function);
  });

  it("check UI", () => {
    expect(
      element.querySelector(".section__button_type_create-field")
    ).not.toBeNull();
    expect(
      element.querySelector(".section__button_type_add-new-game")
    ).not.toBeNull();
    expect(element.querySelector(".section__game")).not.toBeNull();
  });

  it("check adding a new game", () => {
    const buttonAddNewGame: HTMLButtonElement | null = element.querySelector(
      ".section__button_type_add-new-game"
    );

    buttonAddNewGame?.click();
    expect(element.querySelector(".wrapper__section_ordinal_2")).not.toBeNull();
  });

  it("checking the deletion of a new game", () => {
    const buttonAddNewGame: HTMLButtonElement | null = element.querySelector(
      ".section__button_type_add-new-game"
    );

    buttonAddNewGame?.click();

    const buttonRemoveGame: HTMLButtonElement | null = element.querySelector(
      ".section__button_type_remove-game"
    );

    buttonRemoveGame?.click();

    expect(element.querySelector(".wrapper__section_ordinal_2")).toBeNull();
  });

  it("checking the addition of a field with invalid data", () => {
    const buttonCreateField: HTMLButtonElement | null = element.querySelector(
      ".section__button_type_create-field"
    );

    buttonCreateField?.click();

    const errorMessage: HTMLElement | null = element.querySelector(
      ".section__error-message"
    );

    expect(element.querySelector(".game__field")?.innerHTML).toBe("");
    expect(errorMessage?.style.opacity).toBe("1");
  });

  it("check for hiding the error message after entering incorrect data", async () => {
    const buttonCreateField: HTMLButtonElement | null = element.querySelector(
      ".section__button_type_create-field"
    );

    buttonCreateField?.click();

    await sleep(4000);

    const errorMessage: HTMLElement | null = element.querySelector(
      ".section__error-message"
    );

    expect(errorMessage?.style.opacity).toBe("0");
  });

  it("checking the addition of a field with correct data", () => {
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
});
