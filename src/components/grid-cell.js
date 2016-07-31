import React, { PropTypes } from 'react';

class GridCell extends React.Component {
  render () {
    let classes = [
      "grid__cell"
      // , "tile-" + this.props.value
    ];
    return (
      <div className={classes.join(' ')}>
        {this.props.value}
      </div>
    )
  }
}

export default GridCell;

