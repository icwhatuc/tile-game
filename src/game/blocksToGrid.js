// convert array of blocks to the proper locations on the grid
module.exports = function(blocks, gridSize)
{
    var grid = [];
    for(var i=0; i<gridSize; ++i)
    {
        grid[i] = [];
        for(var j=0; j<gridSize; ++j)
        {
            grid[i].push(0);
        }
    }

    var blocksLength = blocks.length;
    for(var i=0; i<blocksLength; ++i)
    {
        var block = blocks[i];
        var numTilesLength = block.length;
        for(var j=0; j<numTilesLength; ++j)
        {
            var tile = block[j]
            posx = tile.position.x;
            posy = tile.position.y;
            value = tile.value;
            grid[posx][posy] = value;
        }
    }
    return grid;
}
