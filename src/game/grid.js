export function constructEmptyGrid(gridHeight, gridWidth) {
  let grid = [];
  for(let rowNum = 0; rowNum < gridHeight; rowNum++) {
    let row = [];
    for(let colNum = 0; colNum < gridWidth; colNum++) {
      row.push(0);
    }
    grid.push(row);
  }
  /* TODO
  return (new Array(gridHeight)).map((gridRow) => {
    return new Array(gridWidth);
  });
  */
  return grid;
}

