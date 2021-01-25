import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SingleNumber from './SingleNumber';
import "./index.css";

class Numbers extends Component{
	constructor(props){
		super(props);

		this.onChange = this.onChange.bind(this);
	}

	onChange(num){
		this.props.onUpdate(num);
	}

	render(){
		const numbers = [];
		for(let i = 1; i < 10; i++){
			numbers[i] = i;
		}
		return (
			<div className="container">
			 {numbers.map(num =>
			 	<SingleNumber key={num}
			 		className="num"
			 		onClick={() => this.onChange(num)}>
			 		{num}
			 	</SingleNumber>
			 )}
			 	<SingleNumber key={0}
			 		className="zero"
			 		onClick={() => this.onChange(0)}>
			 		{0}
			 	</SingleNumber>
			</div>
		);
	}
}

Numbers.propTypes = {
	onUpdate: PropTypes.func.isRequired
}

export default Numbers;
