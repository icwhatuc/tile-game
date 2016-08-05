import React, { PropTypes } from 'react';

import GridCell from './grid-cell';

class GridRow extends React.Component {
  render () {
    let self = this;
    let gridCells = self.props.row.map(function(cellValue, cellIdx) {
      return <GridCell
        tick={self.props.tick}
        value={cellValue}
        rowIdx={self.props.rowIdx}
        key={cellIdx}/>
    });
    return (
      <div className="grid__row">
        {gridCells}
      </div>
    )
  }
}

export default GridRow;

