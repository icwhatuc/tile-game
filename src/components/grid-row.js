import React, { PropTypes } from 'react';

import GridCell from './grid-cell';

class GridRow extends React.Component {
  render () {
    let self = this;
    let {prevReferenceRow, referenceRow, nextReferenceRow} = self.props;
    let gridCells = self.props.row.map(function(cellValue, cellIdx) {
      let blockIdx = referenceRow[cellIdx];
      let extendsTop = false
        , extendsBottom = false
        , extendsLeft = false
        , extendsRight = false;
      
      if(blockIdx !== null) {
        extendsTop = prevReferenceRow[cellIdx] !== blockIdx;
        extendsBottom = nextReferenceRow[cellIdx] !== blockIdx;
        extendsLeft = referenceRow[cellIdx-1] !== blockIdx;
        extendsRight = referenceRow[cellIdx+1] !== blockIdx;
      }

      return <GridCell
        tick={self.props.tick}
        value={cellValue}
        rowIdx={self.props.rowIdx}
        key={cellIdx}
        extendsTop={extendsTop}
        extendsBottom={extendsBottom}
        extendsLeft={extendsLeft}
        extendsRight={extendsRight}
      />
    });
    return (
      <div className="grid__row">
        {gridCells}
      </div>
    )
  }
}

export default GridRow;

