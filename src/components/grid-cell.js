import React, { PropTypes } from 'react';

class GridCell extends React.Component {
  render () {
    let displayValue = this.props.value || 0;
    let classes = [
      "grid__cell"
      , "tile-" + (displayValue)
    ];
    return (
      <div className={classes.join(' ')}>
        {displayValue}
      </div>
    )
  }
}

export default GridCell;

