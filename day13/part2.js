var R = require('ramda');
var trace = R.tap(console.log);

var parseLine = (line) => (/(.*) would (.*) (.*) happiness units by sitting next to (.*)./g).exec(line);
var readLine = R.compose(R.zipObj(['person', 'direction', 'amount', 'nextTo']), R.tail, parseLine);
var parseInput = R.compose(R.map(readLine), R.split('\n'), R.trim)
var getPeople = R.compose(R.uniq, R.map(R.prop('person'))); 
var max = R.reduce(R.max, -Infinity);

var without = R.useWith(R.reject, [R.equals, R.identity]);
var permutations = (xs) => {
	if (xs.length === 1) return [xs]; 
	return R.unnest(R.map(x => R.map(R.unnest, R.xprod([x], permutations(without(x, xs)))), xs));
};

var createLookup = (data) => {
	return R.reduce((lookup, line) => {
		lookup[line.person] = lookup[line.person] || {}
		lookup[line.person][line.nextTo] = line.direction === 'gain' ? parseInt(line.amount) : -parseInt(line.amount);
		return lookup;
	}, {}, data);
};

var calcHappiness = R.curry((lookup, permutation) => {
	return R.compose(
		R.sum,
		R.converge(R.zipWith((x,y) => {
			return (x === 'me' || y === 'me') ? 0 : lookup[x][y] + lookup[y][x];
		}), [R.identity, R.converge(R.concat, [R.tail, R.head])])
	)(permutation);
});

var solution = (input) => {
	var data = parseInput(input);
	var people = getPeople(data);
	people.push('me');
	var perms = permutations(people);
	var lookup = createLookup(data);
	var happinessPossibilities = R.map(calcHappiness(lookup), perms);

	return max(happinessPossibilities);
};

module.exports = solution;