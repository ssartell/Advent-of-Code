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

var areaOfSides = R.compose(R.map(R.reduce(R.multiply, 1)), sideLengths);
var sqFtFromSides = R.compose(R.sum, R.map(R.multiply(2)), areaOfSides);
var sqFtFromSlack = R.compose(R.reduce(R.min, Infinity), areaOfSides);
var sqFtFromPresent = R.converge(R.unapply(R.sum), [sqFtFromSlack, sqFtFromSides]);
var solution = R.compose(R.sum, R.map(R.compose(sqFtFromPresent, dimensionStringToInts)), splitLines, R.trim);

module.exports = solution;