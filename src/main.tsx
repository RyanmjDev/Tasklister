import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { animated, useTransition, config as springConfig } from '@react-spring/web';

import App from './App';
import Login from './Pages/Login';
import Register from './Pages/Register';
import './index.css';

const AnimatedRoutes: React.FC = () => {
    const location = useLocation();
    const transitions = useTransition(location, {
        from: { opacity: 0, position: 'absolute', width: '100%', zIndex: 1 },
        enter: { opacity: 1, position: 'absolute', width: '100%', zIndex: 1 },
        leave: { position: 'absolute', width: '100%', zIndex: 0 },
        config: { ...springConfig.stiff, duration: 500 },
    });

    return transitions((props, item) => (
        <animated.div style={props}>
            <Routes key={item.pathname}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<App />} />
            </Routes>
        </animated.div>
    ));
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Router>
            <AnimatedRoutes />
        </Router>
    </React.StrictMode>,
);
