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
                            <button className="btn btn-light d-inline-flex">
                                <i className="material-icons mr-1">person</i>
                                {user.username}
                            </button>
                        </Link>
                    </li>
                    <li className="nav-item nav-link">
                        <button
                            className="btn btn-light d-inline-flex"
                            onClick={onLogoutSuccess}
                        >
                            <i className="material-icons mr-1">logout</i>
                            Logout
                        </button>
                    </li>
                </ul>
            );
        } else {
            links = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            <button className="btn btn-light d-inline-flex">
                                <i className="material-icons mr-1">login</i>
                                Login
                            </button>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">
                            <button className="btn btn-light d-inline-flex">
                                <i className="material-icons mr-1">edit_note</i>
                                Sign up
                            </button>
                        </Link>
                    </li>
                </ul>
            );
        }

        return (
            <div className="shadow-sm bg-light mb-3">
                <nav className="navbar navbar-light navbar-expand container">
                    <Link className="navbar-brand font-weight-bold align-center" to="/">
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
