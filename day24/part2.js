var R = require('ramda');
var combinations = require('combinations');

var parseInput = R.compose(R.map(parseInt), R.split('\n'), R.trim);

var placementsEqual = R.compose(R.equals(1), R.length, R.uniq, R.map(R.sum));

var entanglement = R.reduce(R.multiply, 1);

var nChooseK = (set, n) => {
    if (n === 0) {
        return [[]];
    }
    
    if (set.length === n) {
        return [set];
    }
    
    var element = [R.head(set)];
    
    var haveNots = nChooseK(R.tail(set), n);
    var haves = R.map((set) => R.concat(element, set), nChooseK(R.tail(set), n - 1));
    
    return R.concat(haves, haveNots);
};

var solution = (input) => {
    var presents = parseInput(input);
    var fourth = R.sum(presents) / 4;
    var min = Infinity;
    for(var i = 1; i <= 5; i++) {
        console.log(i);
        var combos = nChooseK(presents, i);
        var validCombos = R.filter(R.compose(R.equals(fourth), R.sum), combos);
        min = R.reduce(R.min, min, R.map(entanglement, validCombos));
    }
    
    return min;
};

module.exports = solution;