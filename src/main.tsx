import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { SiteDataProvider } from "./context/SiteDataContext";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <ThemeProvider>
      <SiteDataProvider>
        <App />
      </SiteDataProvider>
    </ThemeProvider>
  </LanguageProvider>
);
