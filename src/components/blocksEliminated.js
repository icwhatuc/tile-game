import React, { PropTypes } from 'react';

class BlocksEliminated extends React.Component {
  render () {
    let displayValue = this.props.value;
    return (
      <div className="BlocksEliminated">
        {displayValue}
      </div>
    )
  }
}

export default BlocksEliminated;
