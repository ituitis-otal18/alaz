import React from 'react';

const defaultImg = '/placeholder.jpeg';

class ProfileImage extends React.Component {
    render() {
        const { className, width, height, image } = this.props;
        return (
            <img
                alt="user profile"
                src={image? `/images/${image}` : defaultImg}
                width={width}
                height={height}
                className={className}
                onError={(event) => {
                    event.target.src = defaultImg;
                }}
            />
        );
    }
}

export default ProfileImage;
