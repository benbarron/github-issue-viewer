import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { IssueProvider } from './context/IssueContext';
import './styles/main.scss';

ReactDOM.render(
  <React.StrictMode>
    <IssueProvider>
      <App />
    </IssueProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
