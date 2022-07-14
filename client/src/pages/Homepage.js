import React from 'react';
import { Authentication } from '../api/AuthContext';
import UserList from '../components/UserList';

class Homepage extends React.Component {
    static contextType = Authentication;

    render() {
        const { colors } = this.props.theme;

        return (
            <div className="container">
                <h3 className={`text-${colors.text}`}>Homepage!</h3>
                <UserList user={this.context.state.user} />
            </div>
        );
    }
}

export default Homepage;
