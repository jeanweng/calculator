import React from 'react';
import PropTypes from 'prop-types';
import "./index.css";

const Decimal = ({onClick}) => 
	<button 
		className="decimal"
		onClick={onClick}
		type="button"
	>
		.
	</button>


Decimal.propTypes = {
	onClick: PropTypes.func.isRequired
}

export default Decimal;