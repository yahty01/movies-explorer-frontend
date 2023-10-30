import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './components/App/App';

// Получаем ссылку на элемент DOM, в который будет рендериться наше приложение
const rootElement = document.getElementById('root');

// Функция для рендеринга приложения
function renderApp() {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
}


renderApp();