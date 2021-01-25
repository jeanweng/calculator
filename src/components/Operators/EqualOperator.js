import React from 'react';
import './index.css';

const EqualOperator = ({onClick}) => 
	<button 
		className="equal"
		type="button"
		onClick={onClick}
	>
		=
	</button>

export default EqualOperator;