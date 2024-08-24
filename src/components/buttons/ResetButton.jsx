// src/components/Buttons/ResetButton.jsx
import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const ResetButton = ({ onClick,value }) => {
    return (
        <button type="button" className="btn btn-primary" onClick={onClick}>
            {value}
        </button>
    );
};

ResetButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default ResetButton;
