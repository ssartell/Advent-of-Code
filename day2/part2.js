var R = require('ramda');

var splitLines = R.split('\n');
var splitX = R.split('x');
var dimensionStringToInts = R.compose(R.map(parseInt), splitX);
var sideLengths = function(array) {
	return [
		[array[0], array[1]],
		[array[1], array[2]],
		[array[2], array[0]]	
	]; 
};

var perimeterOfSide = R.compose(R.multiply(2), R.sum);
var feetFromWrap = R.compose(R.reduce(R.min, Infinity), R.map(perimeterOfSide), sideLengths);
var feetFromBow = R.reduce(R.multiply, 1);
var feetFromPresent = R.converge(R.unapply(R.sum), [feetFromBow, feetFromWrap]);
var solution = R.compose(R.sum, R.map(R.compose(feetFromPresent, dimensionStringToInts)), splitLines, R.trim);

module.exports = solution;