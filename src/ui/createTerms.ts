import { createGame } from "./createGame";
import { createUI } from "./createUI";

interface Terms {
  (element: HTMLElement, wrapper: HTMLElement): void;
}

// Создание и добавление условий для экземпляра игры.
const createTerms: Terms = (element, wrapper) => {
  const ordinal = element.getAttribute("data-ordinal") as string;

  element.innerHTML = `${
    Number(ordinal) !== 1 ? "<hr/>" : ""
  }<h3 class="section__term">Введите размеры поля (размеры поля ограничены от 1 до 30)</h3>
  <table>
  <tr>
  <td><label>Ширина - </label></td>
  <td><input type="number" class="section__coord" data-width step="1" min="1" max="30"/></td>
  </tr>
  <tr>
  <td><label>Высота - </label></td>
  <td><input type="number" class="section__coord" data-height step="1" min="1" max="30"/></td>
  </tr>
  </table>
   
   <p class="section__error-message">Введены некорректные значения</p>
   <h3 class="section__term">Вы можете изменить скорость игры</h3>
   <input class="section__range" type="range" min="100" max="2000" value="1000" step="100" list="values"/>
   <datalist id="values" class="section__datalist" >
   <option value="100" label="100 (мс)"></option>
   <option value="500" label="500 (мс)"></option>
   <option value="1000" label="1000 (мс)"></option>
   <option value="1500" label="1500 (мс)"></option>
   <option value="2000" label="2000 (мс)"></option>
   </datalist>
   ${
     Number(ordinal) !== 1
       ? `<button class="section__button_type_remove-game _button">Удалить данный экземпляр игры</button>`
       : `<button class="section__button_type_add-new-game _button">Добавить новую игру</button>`
   }    
   <br/><button class="section__button_type_create-field _button">Создать поле</button>
   <button class="game__button_type_start-stop _button">Начать игру</button><br/><span class="game__message">Игра окончена!</span>   
   <div class="section__game game">
   <div class="game__field field"></div>
   </div>`;

  // Добавление обработчика событий на кнопку создания поля.
  const buttonCreateField = element.querySelector(
    ".section__button_type_create-field"
  );

  const createField = () => {
    const width = element.querySelector("[data-width]") as HTMLInputElement;
    const height = element.querySelector("[data-height]") as HTMLInputElement;

    if (
      !width.value ||
      !height.value ||
      Number(width.value) < 1 ||
      Number(width.value) > 30 ||
      Number(height.value) < 1 ||
      Number(height.value) > 30
    ) {
      const errorMessage = element.querySelector(
        ".section__error-message"
      ) as HTMLElement;

      errorMessage.style.opacity = "1";

      setTimeout(() => {
        errorMessage.style.opacity = "0";
      }, 3000);
    } else {
      const buttonStart: HTMLElement | null = element.querySelector(
        ".game__button_type_start-stop"
      );

      if (buttonStart) {
        buttonStart.style.opacity = "1";
      }

      createGame(Number(width.value), Number(height.value), element);

      if (buttonCreateField) {
        buttonCreateField.innerHTML = "Изменить размеры поля";
        buttonCreateField.removeEventListener("click", createField);
      }

      width.value = "";
      height.value = "";
    }
  };

  if (buttonCreateField) {
    buttonCreateField.addEventListener("click", createField);
  }

  // Добавление обработчика событий на кнопку добавления нового экземпляра игры.
  const buttonAddNewGame = element.querySelector(
    ".section__button_type_add-new-game"
  );

  if (buttonAddNewGame) {
    buttonAddNewGame.addEventListener("click", () => {
      createUI(wrapper);
    });
  }

  // Добавление обработчика событий на кнопку удаления экземпляра игры.
  const buttonRemoveGame = element.querySelector(
    ".section__button_type_remove-game"
  );

  if (buttonRemoveGame) {
    buttonRemoveGame.addEventListener("click", () => {
      element.remove();
    });
  }
};

export { createTerms };
