import React from 'react';
import PropTypes from 'prop-types';

const SingleNumber = ({className, children, onClick}) =>
	<button 
		className={className}
		onClick={onClick}
		type="button"
	>
		{children}
	</button>

SingleNumber.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	children: PropTypes.number.isRequired
}

export default SingleNumber;