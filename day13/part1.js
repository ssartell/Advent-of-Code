var R = require('ramda');
var trace = R.tap(console.log);

var parseLine = (line) => (/(.*) would (.*) (.*) happiness units by sitting next to (.*)./g).exec(line);
var readLine = R.compose(R.zipObj(['person', 'direction', 'amount', 'nextTo']), R.tail, parseLine);
var parseInput = R.compose(R.map(readLine), R.split('\n'), R.trim)

var getPeople = R.compose(R.uniq, R.map(R.prop('person'))); 

var permutations = (xs) => {
	if (xs.length === 1) return [xs]; 
	
	var perms = [];
	for(var i = 0; i < xs.length; i++) {
		var x = xs[i];
		var subPerms = permutations(R.remove(i, 1, xs));
		for(var j = 0; j < subPerms.length; j++) {
			subPerms[j] = R.concat([x], subPerms[j]);
		}
		perms = R.concat(perms, subPerms);
	}
	return perms;
};

var max = R.reduce(R.max, -Infinity);
var permutationHappiness = R.always(0);
var maxHappiness = R.compose(max, R.map(permutationHappiness));

var happinessDelta = (lookup, person, nextTo) => {
	var listItem = lookup[person + '->' + nextTo];
	var amount = parseInt(listItem.amount);
	return listItem.direction === 'gain' ? amount : -amount;	
};

var solution = (input) => {
	var data = parseInput(input);
	var people = getPeople(data);
	var perms = permutations(people);
	
	var lookup = R.reduce((lookup, line) => {
		lookup[line.person + '->' + line.nextTo] = line;
		return lookup;
	}, {}, data);
		
	var happinessPossibilities = R.map((permutation) => {
		var happiness = 0;
		for(var i = 0; i < permutation.length; i++) {
			var leftIndex = (i - 1 + permutation.length) % permutation.length;
			var rightIndex = (i + 1 + permutation.length) % permutation.length;
			
			var person = permutation[i];
			var leftPerson = permutation[leftIndex];
			var rightPerson = permutation[rightIndex];
			
			happiness += happinessDelta(lookup, person, leftPerson);
			happiness += happinessDelta(lookup, person, rightPerson);
		}
		return happiness;
	}, perms);

	return max(happinessPossibilities);
};

module.exports = solution;