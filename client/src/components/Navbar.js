import React from 'react';
import { Link } from 'react-router-dom';
import { Authentication } from '../api/AuthContext';
import ProfileImage from './ProfileImage';

class Navbar extends React.Component {
    static contextType = Authentication;

    state = {
        showDropdown: false,
    };

    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (
            this.wrapperRef.current === null ||
            !this.wrapperRef.current.contains(event.target)
        ) {
            this.setState({ showDropdown: false });
        }
    }

    render() {
        const { showDropdown } = this.state;
        const { loggedIn, user } = this.context.state;
        const onLogoutSuccess = this.context.onLogoutSuccess;
        const { colors, switchTheme } = this.props.theme;

        let dropdown = 'dropdown-menu shadow';
        if (loggedIn && showDropdown) dropdown += ' show';

        return (
            <div className={`shadow-sm bg-${colors.primary} mb-3`}>
                <nav
                    className={`navbar navbar-${colors.primary} navbar-expand container`}
                >
                    <Link
                        className="navbar-brand font-weight-bold d-inline-flex align-items-center"
                        to="/"
                    >
                        <img
                            src="/logo.png"
                            width="48"
                            height="48"
                            className="d-inline-block mr-2"
                            alt="logo"
                        />
                        Alaz
                    </Link>

                    <ul className="navbar-nav ml-auto">
                        {loggedIn ? (
                            <>
                                <li
                                    className="nav-item dropdown"
                                    ref={this.wrapperRef}
                                >
                                    <button
                                        className={`btn btn-${colors.primary} d-inline-flex align-items-center dropdown-toggle`}
                                        onClick={() =>
                                            this.setState({
                                                showDropdown: !showDropdown,
                                            })
                                        }
                                    >
                                        <ProfileImage
                                            className="rounded-circle shadow-sm mr-2"
                                            width="32"
                                            height="32"
                                            image={user.image}
                                        />
                                        {user.username}
                                    </button>

                                    <div className={dropdown}>
                                        <Link
                                            className="dropdown-item d-inline-flex m-auto"
                                            to={`/user/${user.username}`}
                                        >
                                            <i className="material-icons mr-1">
                                                manage_accounts
                                            </i>
                                            My Profile
                                        </Link>

                                        <Link
                                            className="dropdown-item d-inline-flex m-auto"
                                            to={'/'}
                                            onClick={onLogoutSuccess}
                                        >
                                            <i className="material-icons mr-1">
                                                logout
                                            </i>
                                            Logout
                                        </Link>
                                    </div>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        <button
                                            className={`btn btn-${colors.primary} d-inline-flex`}
                                        >
                                            <i className="material-icons mr-1">
                                                login
                                            </i>
                                            Login
                                        </button>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">
                                        <button
                                            className={`btn btn-${colors.primary} d-inline-flex`}
                                        >
                                            <i className="material-icons mr-1">
                                                edit_note
                                            </i>
                                            Sign up
                                        </button>
                                    </Link>
                                </li>
                            </>
                        )}

                        <li
                            className={`nav-item nav-link ${
                                loggedIn && 'py-0'
                            }`}
                        >
                            <button
                                className={`btn btn-${colors.primary} d-inline-flex align-items-center h-100`}
                                onClick={switchTheme}
                            >
                                <i className="material-icons mr-1">
                                    {`${colors.mode}_mode`}
                                </i>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Navbar;
