import React, { PropTypes } from 'react';

import GridRow from './grid-row';
import * as GridFactory from '../game/grid';

class Grid extends React.Component {
  render() {
    let self = this;
    let grid = this.props.visibleDisplayGrid;
    let blockReferenceGrid = this.props.visibleGrid;
    let gridRows = grid.map(function(row, rowIdx) {
      let prevReferenceRow = blockReferenceGrid[rowIdx-1] || [];
      let referenceRow = blockReferenceGrid[rowIdx];
      let nextReferenceRow = blockReferenceGrid[rowIdx+1] || [];

      return <GridRow
        tick={self.props.tick}
        row={row}
        prevReferenceRow={prevReferenceRow}
        referenceRow={referenceRow}
        nextReferenceRow={nextReferenceRow}
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

