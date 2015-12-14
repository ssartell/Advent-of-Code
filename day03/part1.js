var R = require('ramda');

var parseInput = R.split('');

var horizontal = (char) => (char === '<') ? -1 : (char === '>') ? 1 : 0;
var vertical = (char) => (char === '^') ? -1 : (char === 'v') ? 1 : 0;
var updateHistory = function(history, char) {
	history.coords[history.x + ',' + history.y] = 1;	
	var newX = history.x + horizontal(char);
	var newY = history.y + vertical(char);
	history.coords[newX + ',' + newY] = 1;
	return {
		x: newX,
		y: newY,
		coords: history.coords
	};
};
var numberOfHouses = R.compose(R.prop('length'), R.keys, R.prop('coords'), R.reduce(updateHistory, {x:0, y:0, coords:{}}));
var solution = R.compose(numberOfHouses, parseInput);

module.exports = solution;