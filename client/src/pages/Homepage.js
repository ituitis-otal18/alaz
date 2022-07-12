import React from 'react';
import { Authentication } from '../api/AuthContext';
import UserList from '../components/UserList';

class Homepage extends React.Component {
    static contextType = Authentication;

    render() {
        return (
            <div className="container">
                <h3>Homepage!</h3>
                <UserList user={this.context.state.user} />
            </div>
        );
    }
}

export default Homepage;
