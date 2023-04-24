import { createTerms } from "./createTerms";

interface UI {
  (element: HTMLElement): void;
}

// Создание и добавление экземпляра игры.
const createUI: UI = (element) => {
  const sections = element.querySelectorAll("section");

  const section = document.createElement("section");

  section.classList.add(`wrapper__section`);
  section.classList.add(`section`);
  section.classList.add(`wrapper__section_ordinal_${sections.length + 1}`);
  section.setAttribute("data-ordinal", `${sections.length + 1}`);

  element.insertAdjacentElement("beforeend", section);

  createTerms(section, element);
};

export { createUI };
