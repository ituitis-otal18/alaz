import React from 'react';

const defaultImg = '/placeholder.jpeg';

class ProfileImage extends React.Component {
    render() {
        const { className, style, width, height, image } = this.props;
        return (
            <img
                alt="user profile"
                src={image? `/images/${image}` : defaultImg}
                className={className}
                style={style}
                width={width}
                height={height}
                onError={(event) => {
                    event.target.src = defaultImg;
                }}
            />
        );
    }
}

export default ProfileImage;
