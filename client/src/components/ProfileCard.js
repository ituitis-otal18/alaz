import React from 'react';

class ProfileCard extends React.Component {
    render() {
        const username = this.props.username;
        return (
            <div className="card">
                <h3 className="card-header text-center">profile: {username}</h3>
            </div>
        );
    }
}

export default ProfileCard;
