import React from 'react';
import { login } from '../api/ApiRequests';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import { Navigate } from 'react-router-dom';
import { Authentication } from '../api/AuthContext';

class Login extends React.Component {
    static contextType = Authentication;

    state = {
        username: null,
        password: null,
        pendingApiCall: false,
        error: false,
        success: false,
    };

    onChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value, error: false });
    };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ pendingApiCall: true, error: false });

        const { username, password } = this.state;
        const creds = { username, password };

        await login(creds)
            .then((res) => {
                console.info(res.data);
                this.setState({ success: true });
                this.context.onLoginSuccess(res.data);
            })
            .catch((err) => {
                console.error(err.response.data.message);
                this.setState({ error: true });
            });

        this.setState({ pendingApiCall: false });
    };

    render() {
        const { pendingApiCall, error, success } = this.state;
        const btnEnabled = this.state.username && this.state.password;

        return (
            <div className="container-fluid">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-sm">
                        <div className="card w-50 mx-auto">
                            <div className="card-header">
                                <h1 className="card-title text-center">
                                    Login
                                </h1>
                            </div>
                            <div className="card-body">
                                <form>
                                    <Input
                                        name="username"
                                        label="Username"
                                        error={error}
                                        onChange={this.onChange}
                                        type="text"
                                    />
                                    <Input
                                        name="password"
                                        label="Password"
                                        error={error}
                                        onChange={this.onChange}
                                        type="password"
                                    />
                                    {error && (
                                        <div className="alert alert-danger">
                                            <span className="align-middle">
                                                <i className="material-icons">
                                                    error
                                                </i>
                                            </span>
                                            Wrong username or password
                                        </div>
                                    )}
                                    <div className="text-center">
                                        <SubmitButton
                                            onClick={this.onSubmit}
                                            pendingApiCall={pendingApiCall}
                                            btnEnabled={btnEnabled}
                                            text="Login"
                                        />
                                        {success && (
                                            <Navigate to="/" replace={true} />
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <img
                            className="img-thumbnail d-block mx-auto"
                            alt="bg"
                            src="https://source.unsplash.com/random"
                            style={{
                                maxHeight: 600,
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
