var R = require('ramda');

var trace = R.tap(console.log);
var debug = (a,b,c,d,e,f,g) => { debugger; return a; };

var parseInput = R.compose(R.split('\n'), R.trim);
var grid = R.times(R.compose(R.times(R.always(0)), R.always(1000)), 1000);

var getCoords = R.compose(R.apply(R.zip), R.splitEvery(2), R.map(parseInt), R.match(/(\d+)/g));
var applyFunc = R.curry(function(func, command, grid) {
	var coords = getCoords(command);
	for(var i = coords[0][0]; i <= coords[0][1]; i++) {
		for(var j = coords[1][0]; j <= coords[1][1]; j++) {
			grid[i][j] = func(grid[i][j]);
		}
	}
	
	return grid;
});

var getAction = R.cond([
	[R.test(/turn on/g), applyFunc(R.add(1))],
	[R.test(/turn off/g), applyFunc(R.compose(R.max(0), R.subtract(R.__, 1)))],
	[R.test(/toggle/g), applyFunc(R.add(2))]
])
var callAction = R.flip(R.call);
var countGrid = R.compose(R.sum, R.flatten);

var solution = R.compose(countGrid, R.reduce(callAction, grid), R.map(getAction), parseInput);

module.exports = solution;