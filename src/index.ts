import "./styles/styles.css";
import { createUI } from "./ui/createUI";

const app: HTMLElement | null = document.getElementById("app");

if (app) {
  createUI(app);
}
