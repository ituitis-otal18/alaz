import React from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../api/ApiRequests';
import { Authentication } from '../api/AuthContext';
import ProfileImage from '../components/ProfileImage';

class UserList extends React.Component {
    static contextType = Authentication;

    state = {
        init: false,
        allUsers: [],
        currentPage: 0,
        totalPages: 0,
        pendingApiCall: false,
    };

    getUsersFromDB = async (currentPage) => {
        const { username } = this.context.state.user;
        this.setState({ pendingApiCall: true });

        await getUsers(currentPage - 1, username)
            .then((res) => {
                this.setState({
                    allUsers: res.data.content,
                    currentPage: res.data.pageable.pageNumber + 1,
                    totalPages: res.data.totalPages,
                });
            })
            .catch((err) => {
                console.error(err.response);
            });

        this.setState({ pendingApiCall: false });
    };

    initialize = () => {
        if (!this.state.init) {
            this.getUsersFromDB(1);
            this.setState({ init: true });
        }
    };

    backPage = () => {
        this.getUsersFromDB(this.state.currentPage - 1);
    };

    nextPage = () => {
        this.getUsersFromDB(this.state.currentPage + 1);
    };

    render() {
        this.initialize();

        const { allUsers, currentPage, totalPages, pendingApiCall } =
            this.state;

        return (
            <div className="card">
                <h3 className="card-header text-center">Users</h3>
                <div className="list-group-flush">
                    {allUsers.map((user) => (
                        <Link
                            className="list-group-item list-group-item-action"
                            key={user.username}
                            to={`/user/${user.username}`}
                        >
                            <ProfileImage
                                className="rounded-circle d-inline-block mr-3 shadow"
                                width="32"
                                height="32"
                                image={user.image}
                            />
                            @{user.username}
                        </Link>
                    ))}
                </div>
                <ul className="pagination justify-content-center pt-2">
                    <li className="page-item">
                        <button
                            className="btn btn-primary d-inline-flex"
                            disabled={currentPage === 1 || pendingApiCall}
                            onClick={this.backPage}
                        >
                            <span className="material-icons">arrow_back</span>
                        </button>
                    </li>

                    <li className="page-item">
                        <p
                            className="page-link disabled text-center"
                            style={{ minWidth: '5em' }}
                        >
                            {pendingApiCall ? (
                                <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            ) : (
                                `${currentPage} / ${totalPages}`
                            )}
                        </p>
                    </li>

                    <li className="page-item">
                        <button
                            className="btn btn-primary d-inline-flex"
                            disabled={
                                currentPage === totalPages || pendingApiCall
                            }
                            onClick={this.nextPage}
                        >
                            <span className="material-icons">
                                arrow_forward
                            </span>
                        </button>
                    </li>
                </ul>
            </div>
        );
    }
}

export default UserList;
