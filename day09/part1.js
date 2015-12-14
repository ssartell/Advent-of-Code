var R = require('ramda');
var trace = R.tap(console.log);

var parseLine = (line) => (/(\w+) to (\w+) = (\d+)/gi).exec(line);
var readLine = R.compose(R.zipObj(['a', 'b', 'distance']),  R.tail, parseLine);
var parseInput = R.compose(R.map(readLine), R.split('\n'), R.trim);

var uniqLocations = R.compose(R.uniq, R.converge(R.concat, [R.pluck('a'), R.pluck('b')]));
var getDistance = R.curry((edges, locations) => {
	var edge = R.find((edge) => (edge.a === locations[0] && edge.b === locations[1]) || (edge.a === locations[1] && edge.b === locations[0]), edges);
	return parseInt(edge.distance);
});

var without = R.useWith(R.reject, [R.equals, R.identity]);
var permutations = (xs) => {
	if (xs.length === 1) return [xs]; 
	return R.unnest(R.map(x => R.map(R.unnest, R.xprod([x], permutations(without(xs, x)))), xs));
};

var solution = (input) => {
	var edges = parseInput(input);
	var locations = uniqLocations(edges);
	var possiblePaths = permutations(locations);
	var sumTotalDistance = R.compose(R.sum, R.map(getDistance(edges)), R.converge(R.zip, [R.dropLast(1), R.tail]));
	var max = R.compose(R.reduce(R.min, Infinity), R.map(sumTotalDistance))(possiblePaths);
	
	return max;
};

module.exports = solution;