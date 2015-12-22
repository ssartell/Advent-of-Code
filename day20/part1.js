var R = require('ramda');

var parseInput = R.compose(parseInt, R.trim);

var solution = (input) => {
    var presents = parseInput(input);
    
    var cap = 999999;
    var houses = R.times(R.always(0), cap);
    
    for(var i = 1; i < cap; i++) {        
        for(var j = i; j < cap; j += i) {
            houses[j] += i * 10;
        }
    }
    
    for(var i = 1; i < cap; i++) {        
        if (houses[i] > presents) return i;
    }
    
    return null;
};

module.exports = solution;


// var solution = (input) => {
//     var presents = parseInput(input);
//     
//     for(var i = 1; i <= 9999999; i++) {
//         var house = 0;
//         
//         for(var j = 1; j <= i; j++) {
//             if (i % j === 0)
//                 house += j * 10;
//         }
//         
//         if (house > presents) return i;
//     }
// };

// var R = require('ramda');
// var factor = require('number-theory').factor;
// var trace = R.tap(console.log);
// 
// var parseInput = R.compose(parseInt, R.trim);
// var thing = R.memoize((prime, power) => (Math.pow(prime, power + 1) - 1) / (prime - 1));
// var callThing = (factor) => thing(factor.prime, factor.power);
// var getPresents = R.compose(R.reduce(R.multiply, 1), R.map(callThing), factor);
// 
// var solution = (input) => {
//     var presents = parseInput(input) / 10;
//     
//     for(var i = 1; i <= 999999; i++) {
//         if (getPresents(i) > presents) return i;
//     }
// };
// 
// console.log(getPresents(72));
// 
// module.exports = solution;