import React, { Component } from 'react';
import ResultDisplay from '../ResultDisplay';
import Numbers from '../Numbers';
import Operators from '../Operators';
import EqualOperator from '../Operators/EqualOperator';
import Reset from '../Reset';
import Decimal from '../Numbers/Decimal';
import './index.css';

class Calculator extends Component{
	constructor(props){
	    super(props);

	    this.state = {
	      currVal: 0,
				preVal: 0,
				currDisplay: "0",
				base: 1,
	      isNewNumber: true,
	      isOperatorEntered: false,
	      isCompleted: false,
        isDecimalAdded: false,
				displayedEquation: "",
	    }

	    this.onEnterNumber = this.onEnterNumber.bind(this);
	    this.onAddDecimalPoint = this.onAddDecimalPoint.bind(this);
	    this.onEnterOperator = this.onEnterOperator.bind(this);
	    this.onReset = this.onReset.bind(this);
	    this.updateResult = this.updateResult.bind(this);
	    this.onEqualTo = this.onEqualTo.bind(this);
  	}

  	onEnterNumber(num){
			const {currVal, base, isDecimalAdded, isCompleted, isNewNumber, displayedEquation} = this.state;
			if(currVal > 9999999999 || base >= 10) return;
			// if this is the beginning of an equation
			// or a new number after an operator
			let newBase = base;
			if(isCompleted || isNewNumber){
				this.setState((state) => {
					return {
						isCompleted: false,
						currVal: num,
						currDisplay: num,
						isNewNumber: false,
						displayedEquation: isCompleted? "" + num : displayedEquation + num
					}
				});
			}else{
				let newVal = 0;
				// Determine whether the value has a decimal point
				if(isDecimalAdded){
					newVal = currVal + num / Math.pow(10, newBase);
					newBase++;
				}else{
					newVal = currVal * 10 + num;
				}
				console.log(newVal);
				this.setState({
					currVal: newVal,
					base: newBase,
					currDisplay: base === 1 ? newVal.toString() : newVal.toPrecision(newBase - 1).toString(),
					isNewNumber: false,
					displayedEquation: displayedEquation + num
				})
			}
  	}

  	onAddDecimalPoint(){
			const {currDisplay, isNewNumber,displayedEquation} = this.state;
			if(!this.state.isDecimalAdded){
				this.setState({
					isDecimalAdded: true,
					currDisplay: isNewNumber ? "." : currDisplay + ".",
					displayedEquation: displayedEquation + "."
				});
			}
  	}

  	onEnterOperator(op) {
			const {currVal, isCompleted, displayedEquation} = this.state;
			let actualDisplay = displayedEquation;
			let parsed = parseInt(displayedEquation.charAt(displayedEquation.length - 1));
			if(isNaN(parsed)){
				actualDisplay = displayedEquation.slice(0, displayedEquation.length - 1);
			}
			this.setState({
				currVal: 0,
				base: 1,
				isCompleted: false,
				isNewNumber: true,
				isDecimalAdded: false,
				isOperatorEntered: true,
				displayedEquation: isCompleted ? currVal + op : actualDisplay + op
			});
  	}

  	updateResult(){
  		const {displayedEquation} = this.state;
			let vals = [];
			let ops = [];
			let parts = displayedEquation.split(/(\+|-|\*|\/)/);
			if(parts[0] === ""){
				parts[0] = "0";
			}
			console.log(parts);
			for(let s of parts){
				if(["+", "-", "*", "/"].includes(s)){
					ops.push(s);
				}else{
					let op = ops[ops.length - 1];
					if(["*", "/"].includes(op)){
						let val = parseFloat(s);
						ops.pop();
						let preVal = vals.pop();
						if(op === "*"){
							vals.push(preVal * val);
						}else{
							vals.push(preVal / val);
						}
					}else{
						vals.push(parseFloat(s));
					}
				}
			}
			console.log("vals:" + vals);
			console.log("ops: " + ops);
			vals = vals.reverse();
			ops = ops.reverse();
			while(ops.length !== 0){
				let op = ops.pop();
				let preVal = vals.pop();
				let val = vals.pop();
				if(op === "+"){
					vals.push(preVal + val);
				}else vals.push(preVal - val);
			}
			return vals.pop();
  	}

  	onEqualTo(){
			const currResult = this.updateResult();
			if(isNaN(currResult)){
				this.onReset();
				this.setState({
					currDisplay: "Error"
				});
				return;
			}
			const resultDisplay = currResult.toString().length <= 12 ? currResult : currResult.toExponential(8);
			const {displayedEquation} = this.state;
			let equationDisplay = displayedEquation + "=" + resultDisplay;
			this.setState({
				currVal: currResult,
				base: 1,
				currDisplay: resultDisplay,
				isCompleted: true,
				isNewNumber: true,
				isDecimalAdded: false,
				isOperatorEntered: false,
				operators: [],
				displayedEquation: equationDisplay
			});
  	}

  	onReset(){
  		this.setState({
  			isNewNumber: true,
  			isOperatorEntered: false,
        isDecimalAdded: false,
  			currVal: 0,
				base: 1,
				currDisplay: "0",
  			operators: [],
        isCompleted: false,
				displayedEquation: ""
  		});
  	}

	render(){
		return (
			<div className="calculator">
				<ResultDisplay value={this.state.currDisplay} display={this.state.displayedEquation}/>
				<div className="box">
					<Reset onClick={this.onReset}/>
					<EqualOperator onClick={this.onEqualTo}/>
				</div>
				<Numbers onUpdate={this.onEnterNumber}/>
        <Decimal onClick={this.onAddDecimalPoint}/>
				<Operators onUpdate={this.onEnterOperator}/>
			</div>
		);
	}
}

export default Calculator;
