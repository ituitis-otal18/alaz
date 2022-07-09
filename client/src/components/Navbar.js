import React from 'react';
import { Link } from 'react-router-dom';
import { Authentication } from '../api/AuthContext';

class Navbar extends React.Component {
    static contextType = Authentication;

    render() {
        const { loggedIn, user } = this.context.state;
        const onLogoutSuccess = this.context.onLogoutSuccess;

        let links;
        if (loggedIn) {
            links = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to={`/user/${user.username}`}
                        >
                            @{user.username}
                        </Link>
                    </li>
                    <li className="nav-item nav-link pointer" style={{cursor:"pointer"}} onClick={onLogoutSuccess}>
                        Logout
                    </li>
                </ul>
            );
        } else {
            links = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">
                            Signup
                        </Link>
                    </li>
                </ul>
            );
        }

        return (
            <div className="shadow-sm bg-light mb-3">
                <nav className="navbar navbar-light navbar-expand container">
                    <Link className="navbar-brand" to="/">
                        <img
                            src="/fire.png"
                            width="32"
                            height="32"
                            className="d-inline-block align-top mr-2"
                            alt="logo"
                        />
                        Alaz
                    </Link>

                    {links}
                </nav>
            </div>
        );
    }
}

export default Navbar;
