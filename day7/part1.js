var R = require('ramda');
var trace = R.tap(console.log);
var debug = (a,b,c,d,e,f,g) => { console.log(times); debugger; return a; }
var logTime = (a,b,c,d,e,f,g) => { console.log(times); return a; }

var getTime = () => (new Date()).getTime();
var times = {};
var time = function(f, name) {
	return function() {
		var start = getTime();
		var result = f.apply(null, arguments);
		var end = getTime();
		times[name] = (times[name] || 0) + (end - start);
		return result;
	};
};

var readConnection = (connection) => (/(?:(?:(\w+) )?(\w+) )?(\w+) -> (\w+)/g).exec(connection);
var parseConnection = R.compose(R.converge(R.concat, [R.compose(R.of, R.prop('o')), R.compose(R.of, R.identity)]), R.zipObj(['i1', 'operator', 'i2', 'o']), R.tail, readConnection);
var parseInput = R.compose(R.fromPairs, R.map(parseConnection), R.split('\n'), R.trim);

var operations = {
	'AND': (f, c) => f(c.i1) & f(c.i2),
	'OR': (f, c) =>  f(c.i1) | f(c.i2),
	'NOT': (f, c) => ~f(c.i2),
	'RSHIFT': (f, c) => f(c.i1) >> f(c.i2),
	'LSHIFT': (f, c) => f(c.i1) << f(c.i2),
	undefined: (f, c) => f(c.i2)
};

var findConnection = R.flip(R.prop);
var getOperation = R.compose(R.prop(R.__, operations), R.prop('operator'));
var getResolveInput = () => resolveInput; // hack for recursion
var callFindConnection = (input) => findConnection(input);

var resolveInput = R.memoize(function(input) {
	var result = parseInt(input);
	
	if (isNaN(result)) {
		var connection = findConnection(input);
		var operation = getOperation(connection);
		
		result = operation(resolveInput, connection);
	}
	return result;
});


var setup = function(input, loadedFindConnection) {
	findConnection = loadedFindConnection;
	return resolveInput(input);
}

var solution = R.compose(
	R.converge(R.call, [R.always(setup), R.always('a'), R.identity]),
	findConnection,
	parseInput
);

module.exports = solution;


