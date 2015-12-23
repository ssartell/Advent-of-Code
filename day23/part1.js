var R = require('ramda');

var instructionRegex = (text) => (/(\w*) (\w|(?:[\+|-]\d*))(?:, ([\+|-]\d*))?/g).exec(text);
var offsetEvolve = {
    offset: parseInt
};
var instructionsMap = {
    hlf: R.compose(R.zipObj(['name', 'register'])),
    tpl: R.compose(R.zipObj(['name', 'register'])),
    inc: R.compose(R.zipObj(['name', 'register'])),
    jmp: R.compose(R.evolve(offsetEvolve), R.zipObj(['name', 'offset'])),
    jie: R.compose(R.evolve(offsetEvolve), R.zipObj(['name', 'register', 'offset'])),
    jio: R.compose(R.evolve(offsetEvolve), R.zipObj(['name', 'register', 'offset'])),
}
var toInstruction = (match) => {
    return instructionsMap[match[0]](match);
}
var parseInput = R.compose(R.map(R.compose(toInstruction, R.tail, instructionRegex)), R.split('\n'), R.trim);

var instructionSet = {
    hlf: (state, inst) => { 
        state[inst.register] /= 2;
        state.i++;
    },
    tpl: (state, inst) => { 
        state[inst.register] *= 3;
        state.i++;
    },
    inc: (state, inst) => { 
        state[inst.register] += 1;
        state.i++;
    },
    jmp: (state, inst) => { 
        state.i += inst.offset;
    },
    jie: (state, inst) => {
        if (state[inst.register] % 2 === 0) {
            state.i += inst.offset;
        } else {
            state.i++;
        }
    },
    jio: (state, inst) => { 
        if (state[inst.register] === 1) {
            state.i += inst.offset;
        } else {
            state.i++;
        }
    },
}

var solution = (input) => {
    var instructions = parseInput(input);
    var state = {
        a: 0,
        b: 0,
        i: 0
    }
    var inst;
    
    while(inst = instructions[state.i]) {
        instructionSet[inst.name](state, inst);
    }
    
    return state.b;
};

module.exports = solution;