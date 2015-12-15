var R = require('ramda');

var without = R.useWith(R.reject, [R.equals, R.identity]);
var permutations = (xs) => {
	if (xs.length === 1) return [xs]; 
	return R.unnest(R.map(x => R.map(R.unnest, R.xprod([x], permutations(without(x, xs)))), xs));
};


// var permutations = (xs) => {
// 	if (xs.length === 1) return [xs]; 
// 	
// 	var perms = [];
// 	for(var i = 0; i < xs.length; i++) {
// 		var x = xs[i];
// 		var subPerms = permutations(R.remove(i, 1, xs));
// 		for(var j = 0; j < subPerms.length; j++) {
// 			subPerms[j] = R.concat([x], subPerms[j]);
// 		}
// 		perms = R.concat(perms, subPerms);
// 	}
// 	return perms;
// };

module.exports = {
	without: without,
	permutations: permutations
};