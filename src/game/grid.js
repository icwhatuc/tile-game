export function constructEmptyGrid(gridHeight, gridWidth) {
  let rowGenerator = function() {
    return Array.apply(null, Array(gridWidth)).map(() => (null));
  }
  return Array.apply(null, Array(gridHeight)).map(rowGenerator);
}

export function constructGrid(gridHeight, gridWidth, blocks) {
  let grid = constructEmptyGrid(gridHeight, gridWidth);
  blocks.forEach((block) => {
    block.forEach((tile) => {
      grid[tile.position.y][tile.position.x] = tile.value;
    });
  });
  return grid;
}

