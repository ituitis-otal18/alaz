import React from 'react';

const SubmitButton = (props) => {
    const { onClick, pendingApiCall, btnEnabled, text } = props;

    return (
        <button
            type="submit"
            className="btn btn-primary"
            onClick={onClick}
            disabled={pendingApiCall || !btnEnabled}
        >
            {pendingApiCall && (
                <span className="spinner-border spinner-border-sm"></span>
            )}
            {text}
        </button>
    );
};

export default SubmitButton;
