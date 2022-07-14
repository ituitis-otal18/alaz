import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthContext from './api/AuthContext';
import ThemeContext from './api/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContext>
        <ThemeContext>
            <App />
        </ThemeContext>
    </AuthContext>
);
