import React, { PropTypes } from 'react';

import GridCell from './grid-cell';

class GridRow extends React.Component {
  render () {
    let gridCells = this.props.row.map(function(cellValue, cellIdx) {
      return <GridCell value={cellValue} key={cellIdx}/>
    });
    return (
      <div className="grid__row">
        {gridCells}
      </div>
    )
  }
}

export default GridRow;

