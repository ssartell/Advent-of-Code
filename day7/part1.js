var R = require('ramda');
var trace = R.tap(console.log);
var debug = (a,b,c,d,e,f,g) => { debugger; return a; }

var readConnection = (connection) => (/(?:(?:(\w+) )?(\w+) )?(\w+) -> (\w+)/g).exec(connection);
var parseConnection = R.compose(R.zipObj(['i1', 'operator', 'i2', 'o']), R.tail, readConnection);
var parseInput = R.compose(R.map(parseConnection), R.split('\n'), R.trim);

var operations = {
	'AND': (f, c) => f(c.i1) & f(c.i2),
	'OR': (f, c) =>  f(c.i1) | f(c.i2),
	'NOT': (f, c) => ~f(c.i2),
	'RSHIFT': (f, c) => f(c.i1) >> f(c.i2),
	'LSHIFT': (f, c) => f(c.i1) << f(c.i2),
	undefined: (f, c) => f(c.i2)	
};

var isInputInteger = R.compose(R.not, isNaN, parseInt, R.nthArg(1));
var inputToInteger = R.compose(parseInt, R.nthArg(1));
var findConnection = R.memoize(R.useWith(R.flip(R.find), [R.identity, R.useWith(R.equals, [R.identity, R.prop('o')])]));
var getOperation = R.compose(R.prop(R.__, operations), R.prop('operator'), findConnection);
var resolveInput;
var callResolveInput = (x) => resolveInput(x); // hack for recursion
resolveInput = R.curry(R.binary(R.memoize(
	R.ifElse(isInputInteger, inputToInteger, R.converge(R.call, [getOperation, callResolveInput, findConnection]))
)));

var solution = R.compose(resolveInput(R.__, 'a'), parseInput);

module.exports = solution;


// var resolveInput = R.curry(R.binary(R.memoize(function(connections, input) {
// 	var result = parseInt(input);
// 	
// 	if (isNaN(result)) {
// 		var connection = findConnection(connections, input);
// 		var operation = operations[connection.operator];
// 		
// 		result = operation(resolveInput(connections), connection);
// 	}
// 	return result;
// })));