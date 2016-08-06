import React, { PropTypes } from 'react';

import GridRow from './grid-row';
import * as GridFactory from '../game/grid';

class Grid extends React.Component {
  render() {
    let self = this;
    let grid = this.props.visibleGrid;
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

