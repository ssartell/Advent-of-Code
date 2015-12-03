var R = require('ramda');

var parseInput = R.split('');
var horizontalMove = function(char) {
	if (char === '<') {
		return -1;
	} else if (char === '>') {
		return 1;
	} else {
		return 0;
	}
};
var verticalMove = function(char) {
	if (char === '^') {
		return -1;
	} else if (char === 'v') {
		return 1;
	} else {
		return 0;
	}
};
var updateHistory = function(history, char) {
	var newX = history.x + horizontalMove(char);
	var newY = history.y + verticalMove(char);
	history.coords[newX + ',' + newY] = 1;
	return {
		x: newX,
		y: newY,
		coords: history.coords
	};
};
var numberOfHouses = R.compose(R.add(1), R.prop('length'), R.keys, R.prop('coords'), R.reduce(updateHistory, {x:0, y:0, coords:{}}));
var solution = R.compose(numberOfHouses, parseInput);

module.exports = solution;