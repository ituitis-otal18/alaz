import React from 'react';
import UserList from '../components/UserList';

class Homepage extends React.Component {
    render() {
        return (
            <div className="container">
                <h3>Homepage!</h3>
                <UserList />
            </div>
        );
    }
}

export default Homepage;
