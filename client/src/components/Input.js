import React from 'react';

const Input = (props) => {
    let className = 'form-control';

    if (props.type === 'file') className = 'form-control-file';
    if (props.error) className += ' is-invalid';

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
