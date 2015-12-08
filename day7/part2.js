var R = require('ramda');
var trace = R.tap(console.log);
var debug = (a,b,c,d,e,f,g) => { debugger; return a; }

var readConnection = (connection) => (/(?:(?:(\w+) )?(\w+) )?(\w+) -> (\w+)/g).exec(connection);
var parseConnections = R.compose(R.zipObj(['input1', 'operator', 'input2', 'output']), R.tail, readConnection);
var parseInput = R.compose(R.map(parseConnections), R.split('\n'), R.trim);

var operations = {
	'AND': function(resolveInput, connection) {
		return resolveInput(connection.input1) & resolveInput(connection.input2);
	},
	'OR': function(resolveInput, connection) {
		return resolveInput(connection.input1) | resolveInput(connection.input2);
	},
	'NOT': function(resolveInput, connection) {
		return ~resolveInput(connection.input2);
	},
	'RSHIFT': function(resolveInput, connection) {
		return resolveInput(connection.input1) >> resolveInput(connection.input2);
	},
	'LSHIFT': function(resolveInput, connection) {
		return resolveInput(connection.input1) << resolveInput(connection.input2);
	},
	undefined: function(resolveInput, connection) {
		return resolveInput(connection.input2);
	}	
};

var findOutputConnection = R.useWith(R.find, [R.useWith(R.equals, [R.identity, R.prop('output')]), R.identity]);

var resolveInput = R.curry(R.binary(R.memoize(function(connections, input) {
	var result = parseInt(input);
	
	if (input === 'b') return 46065;
	
	if (isNaN(result)) {
		var connection = findOutputConnection(input, connections);
		var operation = operations[connection.operator];
		
		result = operation(resolveInput(connections), connection);
	}
	return result;
})));

//resolveInput = R.useWith(R.call, [findOutputConnection, R.identity]);

var solution = R.compose(resolveInput(R.__, 'a'), parseInput);
//solution = R.always('a');

// var test = 'bn RSHIFT 2 -> bo';
// var input = parseInput(test);
// console.log(findOutputConnection('bo')(input)); 

module.exports = solution;