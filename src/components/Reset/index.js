import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Reset = ({onClick}) =>
	<button 
		className="reset" 
		onClick={onClick}
		type="button"> AC </button>

Reset.propTypes = {
	onClick: PropTypes.func.isRequired
}

export default Reset;