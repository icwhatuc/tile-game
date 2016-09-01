import React, { PropTypes } from 'react';

class GridCell extends React.Component {
  render () {
    let displayValue = this.props.value || 0;
    let {extendsTop, extendsBottom, extendsLeft, extendsRight} = this.props;
    let classes = [
      "grid__cell"
      , "tile-" + (displayValue)
      , displayValue ? 'grid__cell--no-shadow' : ''
      , extendsTop ? 'grid__cell--extends-top' : ''
      , extendsBottom ? 'grid__cell--extends-bottom' : ''
      , extendsLeft ? 'grid__cell--extends-left' : ''
      , extendsRight ? 'grid__cell--extends-right' : ''
    ];
    return (
      <div className={classes.join(' ')}>
        {displayValue}
      </div>
    )
  }
}

export default GridCell;

