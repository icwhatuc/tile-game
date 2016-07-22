import React, { PropTypes } from 'react';

class GridCell extends React.Component {
  render () {
    return (
      <span className="grid__cell">
        [ {this.props.data} ]
      </span>
    )
  }
}

export default GridCell;

