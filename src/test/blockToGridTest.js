var test = require('tape').test;

var blocksToGrid = require('../game/blocksToGrid.js');

// need to discuss where x and y are; looks to be a bit inconsistent!
test('Blocks to grid', function(t) {
    // note: top left is 0,0
    // x is row, y is column
    var blocks = 
    [
        [
            {position: {x:0, y:0}, value:2},
            {position: {x:0, y:1}, value:2},
            {position: {x:0, y:2}, value:2},
            {position: {x:0, y:3}, value:4}
        ],
        [
            {position: {x:9, y:5}, value:2},
            {position: {x:9, y:6}, value:2},
            {position: {x:9, y:7}, value:2},
            {position: {x:8, y:7}, value:4}
        ]
    ];
    var expectedGrid = 
    [
        [2,2,2,4,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,4,0,0],
        [0,0,0,0,0,2,2,2,0,0],
    ];
    var actualGrid = blocksToGrid(blocks, 10);
    t.deepEqual(actualGrid, expectedGrid, 'should have blocks in the proper position');
    t.end();
});
