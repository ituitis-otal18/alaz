import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserSignup from './pages/UserSignup';
import UserLogin from './pages/UserLogin';
import Homepage from './pages/Homepage';
import UserProfile from './pages/UserProfile';
import Navbar from './components/Navbar';
import { Authentication } from './api/AuthContext';

class App extends React.Component {
    static contextType = Authentication;

    render() {
        const loggedIn = this.context.state.loggedIn;

        return (
            <div>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Homepage />} />

                        {!loggedIn && (
                            <Route path="/login" element={<UserLogin />} />
                        )}
                        {!loggedIn && (
                            <Route path="/signup" element={<UserSignup />} />
                        )}
                        <Route
                            path="/users/:username"
                            element={<UserProfile />}
                        />

                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
