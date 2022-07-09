import React from 'react';

const Input = (props) => {
    const className = props.error ? 'form-control is-invalid' : 'form-control';

    return (
        <div className="form-group">
            <label>{props.label}:</label>
            <input
                name={props.name}
                className={className}
                onChange={props.onChange}
                type={props.type}
            />
            <div className="invalid-feedback">{props.error}</div>
        </div>
    );
};

export default Input;
