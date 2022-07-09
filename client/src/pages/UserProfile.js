import React from 'react';
import { useParams } from 'react-router-dom';
import { Authentication } from '../api/AuthContext';
import ProfileCard from '../components/ProfileCard';

export function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() };
        return <Children {...props} match={match} />;
    };
}

class UserProfile extends React.Component {
    static contextType = Authentication;

    render() {
        const user = this.context.state.user;
        const pathUsername = this.props.match.params.username;
        let message = 'You cannot edit this profile';

        if (user.username === pathUsername)
            message = 'You can edit this profile';

        return (
            <div className="container">
                <ProfileCard username={pathUsername} />
                <p>{message}</p>
            </div>
        );
    }
}

export default withRouter(UserProfile);
