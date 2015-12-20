var R = require('ramda');
var trace = R.tap(console.log);
var debug = (a,b,c,d,e,f,g) => { debugger; return a; };

var tickerTape = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
};

var tryParseInt = R.ifElse(R.compose(isNaN, R.unary(parseInt)), R.identity, R.unary(parseInt));
var lineRegex = (line) => (/Sue \d*: (\w*): (\d*), (\w*): (\d*), (\w*): (\d*)/g).exec(line);
var createObj = R.compose(R.mapObj(tryParseInt), R.fromPairs, R.splitEvery(2), R.tail, lineRegex);
var parseInput = R.compose(R.map(createObj), R.split('\n'), R.trim);

var isSueMatch = (sue) => {
    return R.reduce((accu, key) => {
        if (key === 'cats' || key === 'trees') {
            return accu && (sue[key] > tickerTape[key]);
        } else if (key === 'pomeranians' || key == 'goldfish') {
            return accu && (sue[key] < tickerTape[key]);
        } else {
            return accu && (sue[key] === tickerTape[key]);
        }
    }, true, R.keys(sue));
};

var solution = R.compose(R.add(1), R.findIndex(isSueMatch), parseInput);

module.exports = solution;