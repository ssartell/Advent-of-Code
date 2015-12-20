var R = require('ramda');

var parseInput = R.compose(R.map(R.compose(R.map(R.equals('#')), R.split(''))), R.split('\n'), R.trim);

var step = (grid) => {
    var newGrid = [];
    
    for(var x = 0; x < 100; x++) {
        for(var y = 0; y < 100; y++) {
            var neighbors = 0;
            
            for(var i = -1; i <= 1; i++) {
                var dx = x + i;
                if (dx < 0 || 99 < dx) continue;
                
                for(var j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) continue;
                    
                    var dy = y + j;            
                    if (dy < 0 || 99 < dy) continue; 
                    neighbors += grid[dx][dy] ? 1 : 0;
                }
            }
            
            newGrid[x] = newGrid[x] || [];
            
            newGrid[x][y] = false;
            if (grid[x][y]) {
                if (neighbors === 2 || neighbors === 3) {
                    newGrid[x][y] = true;
                }
            } else {
                if (neighbors === 3) {
                    newGrid[x][y] = true;
                }
            }
        }
    }
    
    return newGrid;
};

var countLit = (grid) => {
    var lit = 0;
    for(var x = 0; x < 100; x++) {
        for(var y = 0; y < 100; y++) {
            if (grid[x][y]) 
                lit++;
        }   
    }
    
    return lit;
}

var solution = (input) => {
    var grid = parseInput(input);
    
    grid[0][0] = true;
    grid[99][0] = true;
    grid[0][99] = true;
    grid[99][99] = true;
    
    for(var i = 0; i < 100; i++) {
        // console.log(i);
        // for(var i = 0; i <= 2; i++) {
        //     console.log(grid[i][0], grid[i][1], grid[i][2]);
        // }
        // 
        // debugger;
        
        grid = step(grid);
        
        grid[0][0] = true;
        grid[99][0] = true;
        grid[0][99] = true;
        grid[99][99] = true;
    }
    
    return countLit(grid);
};

module.exports = solution;