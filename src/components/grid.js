import React, { PropTypes } from 'react';

import GridRow from './grid-row';

class Grid extends React.Component {
  render () {
    let gridRows = this.props.grid.map(function(row, rowIdx) {
      return <GridRow row={row} key={rowIdx}/>
    });
    return (
      <div className="grid">
        {gridRows}
      </div>
    )
  }
}

export default Grid;

