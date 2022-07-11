import React from 'react';
import ProfileImage from './ProfileImage';
import Input from '../components/Input';
import { updatePassword, updateImage } from '../api/ApiRequests';

class ProfileCard extends React.Component {
    state = {
        oldPassword: null,
        newPassword: null,
        newImage: null,
        imageSrc: null,
        inEditMode: false,
        pendingApiCall: false,
        errors: {},
    };

    onChange = (event) => {
        const { name, value } = event.target;
        const errors = { ...this.state.errors };
        errors[name] = undefined;
        this.setState({ [name]: value, errors });
    };

    onFileChange = (event) => {
        if (event.target.length < 1) return;

        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({ newImage: fileReader.result });
        };
        fileReader.readAsDataURL(file);
    };

    onSavePassword = async (event) => {
        event.preventDefault();
        this.setState({ pendingApiCall: true });

        const username = this.props.user.username;
        const body = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
        };

        await updatePassword(username, body)
            .then((res) => {
                console.info(res.data);
                this.setState({ inEditMode: false, errors: {} });
            })
            .catch((err) => {
                const message = err.response.data.message;
                if (message) {
                    this.setState({
                        errors: { oldPassword: message },
                    });
                } else {
                    const validationErrors = err.response.data;
                    if (validationErrors) {
                        this.setState({ errors: validationErrors });
                    }
                }
            });

        this.setState({ pendingApiCall: false });
    };

    onSaveImage = async (event) => {
        event.preventDefault();

        const newImage = this.state.newImage;
        if (!newImage) return;

        this.setState({ pendingApiCall: true });

        const username = this.props.loggedInUser.username;
        const body = {
            newImage: newImage.split(',')[1],
        };

        await updateImage(username, body)
            .then((res) => {
                console.info(res.data);
                this.setState({
                    imageSrc: res.data.image,
                    inEditMode: false,
                    errors: {},
                });
            })
            .catch((err) => {
                const message = err.response.data.message;
                this.setState({
                    errors: { image: message },
                });
            });

        this.setState({ pendingApiCall: false });
    };

    render() {
        const { username, image } = this.props.user;
        const { loggedInUser } = this.props;
        const { inEditMode, pendingApiCall, errors, imageSrc } = this.state;

        return (
            <div className="card text-center">
                <div className="card-header">
                    <ProfileImage
                        className="rounded-circle shadow"
                        width="200"
                        height="200"
                        image={imageSrc || image}
                    />
                </div>

                <div className="card-body">
                    <h3 className="card-title">@{username}</h3>

                    {!inEditMode && loggedInUser.username === username && (
                        <button
                            className="btn btn-info d-inline-flex"
                            onClick={() => {
                                this.setState({ inEditMode: true });
                            }}
                        >
                            <i className="material-icons mr-1">edit</i>Update
                        </button>
                    )}
                    {inEditMode && (
                        <div className="container text-left">
                            <Input
                                name="image"
                                label="Profile Image"
                                onChange={this.onFileChange}
                                type="file"
                            />
                            <button
                                type="submit"
                                className="btn btn-success d-inline-flex mb-2"
                                onClick={this.onSaveImage}
                                disabled={pendingApiCall}
                            >
                                <i className="material-icons mr-1">upload</i>
                                Upload
                            </button>

                            <div className="dropdown-divider"></div>

                            <Input
                                name="oldPassword"
                                label="Old Password"
                                error={errors.oldPassword}
                                onChange={this.onChange}
                                type="password"
                            />
                            <Input
                                name="newPassword"
                                label="New Password"
                                error={errors.newPassword}
                                onChange={this.onChange}
                                type="password"
                            />
                            <div>
                                <button
                                    type="submit"
                                    className="btn btn-success d-inline-flex mr-2"
                                    onClick={this.onSavePassword}
                                    disabled={pendingApiCall}
                                >
                                    <i className="material-icons mr-1">save</i>
                                    Save
                                </button>
                                <button
                                    className="btn btn-danger d-inline-flex"
                                    onClick={() => {
                                        this.setState({
                                            inEditMode: false,
                                            newImage: null,
                                        });
                                    }}
                                >
                                    <i className="material-icons mr-1">close</i>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default ProfileCard;
