import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { SurveyProvider } from "./context/SurveyContext";

createRoot(document.getElementById("root")!).render(
  <SurveyProvider>
    <App />
  </SurveyProvider>
);
