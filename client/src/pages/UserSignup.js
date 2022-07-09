import React from 'react';
import { signup } from '../api/ApiRequests';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import { Navigate } from 'react-router-dom';

class UserSignup extends React.Component {
    state = {
        username: null,
        email: null,
        password: null,
        pendingApiCall: false,
        errors: {},
        success: false,
    };

    onChange = (event) => {
        const { name, value } = event.target;
        const errors = { ...this.state.errors };
        errors[name] = undefined;
        this.setState({ [name]: value, errors });
    };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ pendingApiCall: true, errors: {} });

        const { username, email, password } = this.state;
        const body = { username, email, password };

        await signup(body)
            .then((res) => {
                console.info(res.data.message);
                this.setState({ success: true });
            })
            .catch((err) => {
                const validationErrors = err.response.data;
                if (validationErrors) {
                    this.setState({ errors: validationErrors });
                    console.error(validationErrors);
                }
            });

        this.setState({ pendingApiCall: false });
    };

    render() {
        const { pendingApiCall, errors, success } = this.state;
        const { username, email, password } = errors;
        const btnEnabled =
            this.state.username && this.state.email && this.state.password;

        return (
            <div className="container">
                <form>
                    <h1 className="text-center">Sign Up</h1>
                    <Input
                        name="username"
                        label="Username"
                        error={username}
                        onChange={this.onChange}
                        type="text"
                    />
                    <Input
                        name="email"
                        label="E-mail"
                        error={email}
                        onChange={this.onChange}
                        type="text"
                    />
                    <Input
                        name="password"
                        label="Password"
                        error={password}
                        onChange={this.onChange}
                        type="password"
                    />
                    <div className="text-center">
                        <SubmitButton
                            onClick={this.onSubmit}
                            pendingApiCall={pendingApiCall}
                            btnEnabled={btnEnabled}
                            text="Sign up"
                        />
                        {success && <Navigate to="/login" replace={true} />}
                    </div>
                </form>
            </div>
        );
    }
}

export default UserSignup;
