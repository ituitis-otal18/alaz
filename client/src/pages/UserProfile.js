import React from 'react';
import { useParams } from 'react-router-dom';
import { Authentication } from '../api/AuthContext';
import ProfileCard from '../components/ProfileCard';
import { getUserByUsername } from '../api/ApiRequests';

export function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() };
        return <Children {...props} match={match} />;
    };
}

class UserProfile extends React.Component {
    static contextType = Authentication;

    state = {
        user: null,
        pathUsername: null,
        pendingApiCall: false,
    };

    loadUser = async () => {
        await this.setState({
            pendingApiCall: true,
            pathUsername: this.props.match.params.username,
        });

        await getUserByUsername(this.state.pathUsername)
            .then((res) => {
                this.setState({ user: res.data });
            })
            .catch((err) => {
                console.error(err.response);
                this.setState({ user: null });
            });

        this.setState({ pendingApiCall: false });
    };

    componentDidMount() {
        this.loadUser();
    }

    componentDidUpdate() {
        if (this.state.pathUsername !== this.props.match.params.username)
            this.loadUser();
    }

    render() {
        const loggedInUser = this.context.state.user;
        const { user, pendingApiCall } = this.state;

        return (
            <div className="container">
                {pendingApiCall ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : user ? (
                    <ProfileCard user={user} loggedInUser={loggedInUser} />
                ) : (
                    <div className="alert alert-danger text-center">
                        <div>
                            <i className="material-icons">error</i>
                        </div>
                        User not found!
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(UserProfile);
