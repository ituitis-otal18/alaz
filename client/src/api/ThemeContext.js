import React from 'react';

export const Theme = React.createContext();

const darkTheme = {
    mode: 'dark',
    primary: 'dark',
    secondary: 'gray',
    text: 'white',
};
const lightTheme = {
    mode: 'light',
    primary: 'light',
    secondary: 'white',
    text: 'dark',
};

class ThemeContext extends React.Component {
    state = { ...lightTheme };

    switchTheme = () => {
        const newTheme =
            this.state.mode === 'light' ? darkTheme : lightTheme;
        this.setState(newTheme);
        localStorage.setItem('theme', JSON.stringify(newTheme));
        document.documentElement.setAttribute('data-theme', newTheme.mode);
    };

    componentDidMount() {
        const prevTheme = JSON.parse(localStorage.getItem('theme'));
        if (prevTheme !== null) {
            this.setState(prevTheme);
            document.documentElement.setAttribute(
                'data-theme',
                prevTheme.mode
            );
        }
    }

    render() {
        return (
            <Theme.Provider
                value={{
                    colors: { ...this.state },
                    switchTheme: this.switchTheme,
                }}
            >
                {this.props.children}
            </Theme.Provider>
        );
    }
}

export default ThemeContext;
