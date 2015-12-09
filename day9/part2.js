var R = require('ramda');
var trace = R.tap(console.log);

var parseLine = (line) => (/(\w+) to (\w+) = (\d+)/gi).exec(line);
var readLine = R.compose(R.zipObj(['a', 'b', 'distance']), R.tail, parseLine);
var parseInput = R.compose(R.map(readLine), R.split('\n'), R.trim);

var uniqLocations = R.compose(R.uniq, R.converge(R.concat, [R.pluck('a'), R.pluck('b')]));

var getDistance = (edges, a, b) => {
	return parseInt(R.find(
		(edge) => (edge.a === a && edge.b === b) || (edge.a === b && edge.b ===a),
		edges
	).distance);
};

var solution = (input) => {
	var edges = parseInput(input);
	var locations = uniqLocations(edges);
	
	var findShortestDistance = function(remainingLocations, a, distance) {
		if (remainingLocations.length === 0) 
			return distance;
		
		var shortestDistance = -Infinity;
		for(var i = 0; i < remainingLocations.length; i++) {
			var b = remainingLocations[i];
			var newDistance = distance + (a ? getDistance(edges, a, b) : 0);
			var totalDistance = findShortestDistance(R.remove(i, 1, remainingLocations), b, newDistance);
			
			if (totalDistance > shortestDistance)
				shortestDistance = totalDistance;
		}
		
		return shortestDistance;
	};
	
	return findShortestDistance(locations, null, 0);
};

module.exports = solution;