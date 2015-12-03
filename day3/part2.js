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
	var pos = history.positions[history.turnIndex];
	history.coords[pos.x + ',' + pos.y] = 1; // before
	pos.x += horizontalMove(char);
	pos.y += verticalMove(char);
	history.turnIndex = (history.turnIndex + 1) % history.positions.length;
	history.coords[pos.x + ',' + pos.y] = 1; // after
	
	return history;
};
var numberOfHouses = R.compose(R.prop('length'), R.keys, R.prop('coords'), R.reduce(updateHistory, {turnIndex:0, positions:[{x:0, y:0}, {x:0, y:0}], coords:{}}));
var solution = R.compose(numberOfHouses, parseInput);

module.exports = solution;