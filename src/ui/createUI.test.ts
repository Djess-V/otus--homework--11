import { createUI } from "./createUI";

describe("createUI", () => {
  let element: HTMLElement;
  beforeEach(() => {
    element = document.createElement("div");
  });

  it("is a function", () => {
    expect(createUI).toBeInstanceOf(Function);
  });

  it("section created", () => {
    createUI(element);

    expect(element.querySelector(".wrapper__section_ordinal_1")).not.toBeNull();
  });
});
