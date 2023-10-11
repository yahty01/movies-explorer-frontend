import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));// Создаём корневой элемент, нашего приложения.

root.render( // Рендерим наше приложение в корневой элемент.
  <React.StrictMode>// Включаем строгий режим (StrictMode) для проверки потенциальных проблем в приложении.
    <BrowserRouter>// Оборачиваем наше приложение в компонент BrowserRouter для доступа к функциональности роутинга.
      <App />
    </BrowserRouter>
  </React.StrictMode>
);