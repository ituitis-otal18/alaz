import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserSignup from './pages/UserSignup';
import UserLogin from './pages/UserLogin';
import Homepage from './pages/Homepage';
import UserProfile from './pages/UserProfile';
import Navbar from './components/Navbar';
import { Authentication } from './api/AuthContext';
import { Theme } from './api/ThemeContext';

class App extends React.Component {
    static contextType = Authentication;

    render() {
        const loggedIn = this.context.state.loggedIn;

        return (
            <Theme.Consumer>
                {(value) => (
                    <div>
                        <HashRouter>
                            <Navbar theme={value} />
                            <Routes>
                                <Route path="/" element={<Homepage theme={value}/>} />

                                {!loggedIn && (
                                    <Route
                                        path="/login"
                                        element={<UserLogin />}
                                    />
                                )}
                                {!loggedIn && (
                                    <Route
                                        path="/signup"
                                        element={<UserSignup />}
                                    />
                                )}
                                <Route
                                    path="/user/:username"
                                    element={<UserProfile />}
                                />

                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </HashRouter>
                    </div>
                )}
            </Theme.Consumer>
        );
    }
}

export default App;
