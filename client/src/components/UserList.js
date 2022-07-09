import React from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../api/ApiRequests';
import { Authentication } from '../api/AuthContext';

const defaultImage = (
    <img
        alt="user profile"
        src="/placeholder.jpeg"
        width="32"
        height="32"
        className="rounded-circle d-inline-block mr-2"
    />
);

class UserList extends React.Component {
    static contextType = Authentication;

    state = {
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

    componentDidMount() {
        this.getUsersFromDB(1);
    }

    backPage = () => {
        this.getUsersFromDB(this.state.currentPage - 1);
    };

    nextPage = () => {
        this.getUsersFromDB(this.state.currentPage + 1);
    };

    render() {
        const { allUsers, currentPage, totalPages, pendingApiCall } =
            this.state;

        const spinner = (
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <button className="btn btn-primary" disabled>
                        <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                        ></span>
                    </button>
                </li>
            </ul>
        );
        const pageButtons = (
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <button
                        className="btn btn-primary"
                        disabled={currentPage === 1}
                        onClick={this.backPage}
                    >
                        &laquo;
                    </button>
                </li>
                <li className="page-item">
                    <p className="page-link disabled">
                        {`${currentPage} / ${totalPages}`}
                    </p>
                </li>

                <li className="page-item">
                    <button
                        className="btn btn-primary"
                        disabled={currentPage === totalPages}
                        onClick={this.nextPage}
                    >
                        &raquo;
                    </button>
                </li>
            </ul>
        );

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
                            {user.image ? user.image : defaultImage}@
                            {user.username}
                        </Link>
                    ))}
                </div>
                {pendingApiCall ? spinner : pageButtons}
            </div>
        );
    }
}

export default UserList;
