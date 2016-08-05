import React, { PropTypes } from 'react';

import GridRow from './grid-row';
import * as GridFactory from '../game/grid';

class Grid extends React.Component {
  constructGrid() {
    // TODO: have middleware construct the grid
    // so that reducers can also use it
    let grid = GridFactory.constructEmptyGrid(
        this.props.gridSize.height
        , this.props.gridSize.width
    );
    let hiddenRows = this.props.gridSize.hidden;
    let fallingBlock = this.props.fallingBlock;
    this.props.fallingBlock.forEach((tile) => {
      grid[tile.position.y][tile.position.x] = tile.value;
    });
    return grid.slice(hiddenRows);
  }

  render() {
    let self = this;
    let grid = self.constructGrid();
    let gridRows = grid.map(function(row, rowIdx) {
      return <GridRow
        tick={self.props.tick}
        row={row}
        rowIdx={rowIdx}
        key={rowIdx}/>
    });
    return (
      <div className="grid">
        {gridRows}
      </div>
    );
  }
}

export default Grid;

