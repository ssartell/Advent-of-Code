var R = require('ramda');

var trace = R.tap(console.log);
var debug = (a,b,c,d,e,f,g) => { debugger; return a; };
var filterIndex = R.addIndex(R.filter);

var parseInput = R.split('\n');
var grid = R.times(R.compose(R.times(R.always(0)), R.always(1000)), 1000);

var applyFunc = R.curry(function(grid, func, coords) {
	for(var i = coords[0]; i <= coords[2]; i++) {
		for(var j = coords[1]; j <= coords[3]; j++) {
			grid[i][j] = func(grid[i][j]);
		}
	}
	
	return grid;
});

var countGrid = function() {
	var z = 0;
	for(var i = 0; i <= 999; i++) {
		for(var j = 0; j <= 999; j++) {
			z += grid[i][j];
		}
	}
	
	return z;
}

var getCoords = R.compose(R.map(parseInt), R.match(/(\d+)/g));
var turnOn = R.when(R.test(/turn on/g), R.compose(applyFunc(grid, R.add(1)), getCoords));
var turnOff = R.when(R.test(/turn off/g), R.compose(applyFunc(grid, R.compose(R.max(0), R.subtract(R.__, 1))), getCoords));
var toggle = R.when(R.test(/toggle/g), R.compose(applyFunc(grid, R.add(2)), getCoords));

var solution = R.compose(countGrid, R.map(R.converge(R.always(0), [trace, turnOn, turnOff, toggle])), parseInput);
//solution = R.always('asdf');

module.exports = solution;