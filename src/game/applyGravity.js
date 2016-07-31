export default function applyGravity(grid) {
  let updatedGrid = [];
  updatedGrid = grid.reverse().map((row, index) => {
    let prevRow = grid[index-1] || [];
    let nextRow = grid[index+1] || [];
    let updatedRow = row.slice();
    
    updatedRow = updatedRow.map((cell, index) => {
      if(!cell && nextRow[index]) {
        return nextRow[index];
      }
      if(cell && !prevRow[index]) {
        return 0;
      }
      return cell;
    });
    
    return updatedRow;
  });

  return updatedGrid.reverse();
}

/* NOTES
 *
 * given a grid row, the updated grid row
 * consists of current cells that have NOT collapsed to prevRow
 * and new cells from nextRow that can collapse into current row
 *
 * we know cells have collapsed into prevRow if grid's and updatedGrid's
 * cells do not match
 *
 */

