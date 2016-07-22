import React, { PropTypes } from 'react';

import GridCell from './grid-cell';

class GridRow extends React.Component {
  render () {
    let gridCells = this.props.data.map(function(cell, cellIdx) {
      return <GridCell data={cell} key={cellIdx}/>
    });
    return (
      <div className="grid__row">
        {gridCells}
      </div>
    )
  }
}

export default GridRow;

