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
				savedVal: 0,
	      currVal: 0,
				currDisplay: "0",
	      operator: "",
				base: 0.1,
	      isNewNumberEntered: true,
	      isOperatorEntered: false,
	      isCompleted: false,
        isDecimalAdded: false,
				displayedEquation: "",
				actualEquation: []
	    }

	    this.onEnterNumber = this.onEnterNumber.bind(this);
	    this.onAddDecimalPoint = this.onAddDecimalPoint.bind(this);
	    this.onEnterOperator = this.onEnterOperator.bind(this);
	    this.onReset = this.onReset.bind(this);
	    this.updateResult = this.updateResult.bind(this);
	    this.onEqualTo = this.onEqualTo.bind(this);
  	}

  	onEnterNumber(num){
			if(this.state.currVal > 9999999999) return;
			const {currVal, actualEquation, base, isDecimalAdded, displayedEquation} = this.state;
			if(this.state.isNewNumberEntered){
				this.setState({
					currVal: num,
					currDisplay: num,
					isNewNumberEntered: false,
					actualEquation: [...this.state.actualEquation, num],
					displayedEquation: displayedEquation + num
				});
			}else{
				let newVal = 0;
				if(isDecimalAdded){
					newVal = currVal + num * base;
					this.setState({
						base: base / 10
					});
				}else{
					newVal = currVal * 10 + num;
				}
				this.setState({
					currVal: newVal,
					currDisplay: newVal,
					isNewNumberEntered: false,
					actualEquation: [...actualEquation.slice(0, (actualEquation.length - 1)), newVal],
					displayedEquation: displayedEquation + num
				})
			}
  	}

  	onAddDecimalPoint(){
			if(!this.state.isDecimalAdded){
				this.setState({
					isDecimalAdded: true,
					displayedEquation: this.state.displayedEquation + "."
				});
			}
  	}

  	onEnterOperator(op) {
			const {currVal, isOperatorEntered, displayedEquation} = this.state;
			const currResult = this.updateResult();
			this.setState({
				savedVal: isOperatorEntered ? currResult: currVal,
				currVal: 0,
				operator: op,
				base: 0.1,
				isCompleted: false,
				isNewNumberEntered: true,
				isDecimalAdded: false,
				isOperatorEntered: true,
				displayedEquation: displayedEquation + op
			});
  	}

  	updateResult(){
  		const {currVal, savedVal, operator} = this.state;
			let newVal = savedVal;
  		switch(operator){
  			case "+":
  				newVal += currVal;
  				break;
  			case "-":
  				newVal -= currVal;
  				break;
  			case "*":
  				newVal *= currVal;
  				break;
  			case "/":
					if(currVal === 0){
						return null;
					}
  				newVal /= currVal;
  				break;
  			default:
  				newVal = currVal;
  		}
  		return newVal;
  	}

  	onEqualTo(){
			const currResult = this.updateResult();
			if(currResult === null){
				this.onReset();
				this.setState({
					currDisplay: "Error"
				});
				return;
			}
			console.log(currResult + " length is " + currResult.toString().length);
			const resultDisplay = currResult.toString().length <= 12 ? currResult : currResult.toExponential(8);
			const {displayedEquation} = this.state;
			let equationDisplay = displayedEquation + "=" + resultDisplay;
			equationDisplay = equationDisplay.slice(equationDisplay.length - 30, equationDisplay.length);
			this.setState({
				currVal: currResult,
				savedVal: 0,
				base: 0.1,
				currDisplay: resultDisplay,
				isCompleted: true,
				isNewNumberEntered: true,
				isDecimalAdded: false,
				isOperatorEntered: false,
				operator: "",
				displayedEquation: equationDisplay
			});
  	}

  	onReset(){
  		this.setState({
  			isNewNumberEntered: true,
  			isOperatorEntered: false,
        isDecimalAdded: false,
  			currVal: 0,
				base: 0.1,
  			savedVal: 0,
				currDisplay: "0",
  			operator: "",
        isCompleted: false,
  			actualEquation: [],
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
