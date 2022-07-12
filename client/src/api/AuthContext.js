import React from 'react';
import SecureLS from 'secure-ls';

export const Authentication = React.createContext();
const LS = new SecureLS();

class AuthContext extends React.Component {
    state = {
        loggedIn: false,
        user: {},
    };

    onLoginSuccess = (user) => {
        this.setState({ loggedIn: true, user });
        LS.set('state', { loggedIn: true, user });
    };

    onLogoutSuccess = () => {
        this.setState({ loggedIn: false, user: {} });
        LS.clear();
        window.location.reload();
    };

    onUpdateSuccess = (updatedUser) => {
        this.setState({ user: updatedUser });
    };

    componentDidMount() {
        const prevState = LS.get('state');
        if (prevState) this.setState(prevState);
    }

    render() {
        return (
            <Authentication.Provider
                value={{
                    state: { ...this.state },
                    onLoginSuccess: this.onLoginSuccess,
                    onLogoutSuccess: this.onLogoutSuccess,
                    onUpdateSuccess: this.onUpdateSuccess,
                }}
            >
                {this.props.children}
            </Authentication.Provider>
        );
    }
}

export default AuthContext;
