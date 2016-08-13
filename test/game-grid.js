var test = require('tape').test;

var GridFactory = require('../src/game/grid.js');

// Note, graphics style coordinates; +x=right, +y=down
test('Blocks to grid', function(t) {
    t.plan(1);
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
        [0   ,null,null,null,null,null,null,null,null,null],
        [0   ,null,null,null,null,null,null,null,null,null],
        [0   ,null,null,null,null,null,null,null,null,null],
        [0   ,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,1],
        [null,null,null,null,null,null,null,null,null,1],
        [null,null,null,null,null,null,null,null,1   ,1],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
    ];
    var actualGrid = GridFactory.constructGrid(10, 10, blocks);
    t.deepEqual(actualGrid, expectedGrid, 'should have blocks in the proper position');
});
