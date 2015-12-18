var R = require('ramda');
var trace = R.tap(console.log);

var tryParseInt = R.ifElse(R.compose(isNaN, R.unary(parseInt)), R.identity, R.unary(parseInt));
var ingredientRegex = (ingredient) => (/(.*): capacity (.*), durability (.*), flavor (.*), texture (.*), calories (.*)/g).exec(ingredient);
var readLine = R.compose(trace, R.map(tryParseInt), R.dropLast(1), R.drop(2), ingredientRegex); 
var parseInput = R.compose(R.map(readLine), R.split('\n'), R.trim);
var getProperties = R.compose(R.keys, R.omit(['name']), R.head);

var sumScores = R.zipWith(R.add);

var solution = (input) => {
	var ingredients = parseInput(input);
	
	var max = 0;
	for(var a = 0; a <= 100; a++) {
		var aValues = R.map(R.multiply(a), ingredients[0]);
		
		for(var b = 0; b <= 100; b++) {
			if (a + b > 100) continue;
			var bValues = R.map(R.multiply(b), ingredients[1]);
			
			for(var c = 0; c <= 100; c++) {
				if (a + b + c > 100) continue;
				var cValues = R.map(R.multiply(c), ingredients[2]);
				
				for(var d = 0; d <= 100; d++) {
					if (a + b + c + d !== 100) continue;
					var dValues = R.map(R.multiply(d), ingredients[3]);
					
					var scores = sumScores(aValues, sumScores(bValues, sumScores(cValues, dValues)));
					scores = R.map(R.max(0), scores);
					var total = R.reduce(R.multiply, 1, scores);
					if (total > max) {
						max = total;
					}
				}
			}
		}
	}
	
	return max;
};

module.exports = solution;