import React from 'react';
import UserList from '../components/UserList';

class Homepage extends React.Component {
    render() {
        return (
            <div className="container">
                Homepage!
                <UserList />
            </div>
        );
    }
}

export default Homepage;
