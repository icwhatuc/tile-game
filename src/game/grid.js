export function constructEmptyGrid(gridHeight, gridWidth) {
  let rowGenerator = function() {
    return Array.apply(null, Array(gridWidth)).map(() => (null));
  }
  return Array.apply(null, Array(gridHeight)).map(rowGenerator);
}

export function constructGrid(gridHeight, gridWidth, blocks, options = {}) {
  let grid = constructEmptyGrid(gridHeight, gridWidth);
  blocks.forEach((block, blockIdx) => {
      console.log("HERE");
      console.log(block);
    block.forEach((tile) => {
      grid[tile.position.y][tile.position.x] = options.assignValues ?
        tile.value : blockIdx;
    });
  });
  return grid;
}

