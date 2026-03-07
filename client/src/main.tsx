import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n/config";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
