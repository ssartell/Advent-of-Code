var R = require('ramda');

var dimensionStringToInts = R.compose(R.map(parseInt), R.split('x'));
var parseInput = R.compose(R.map(dimensionStringToInts), R.split('\n'), R.trim);
var sideLengths = (a) => [[a[0], a[1]], [a[1], a[2]], [a[2], a[0]]];

var perimeterOfSide = R.compose(R.multiply(2), R.sum);
var feetFromWrap = R.compose(R.reduce(R.min, Infinity), R.map(perimeterOfSide), sideLengths);
var feetFromBow = R.reduce(R.multiply, 1);
var lengthOfBowForPresent = R.converge(R.unapply(R.sum), [feetFromBow, feetFromWrap]);

var solution = R.compose(R.sum, R.map(lengthOfBowForPresent), parseInput);

module.exports = solution;