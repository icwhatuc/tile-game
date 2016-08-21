import React, { PropTypes } from 'react';

class Level extends React.Component {
  render () {
    let displayValue = this.props.value;
    return (
      <div className="Level">
        {displayValue}
      </div>
    )
  }
}

export default Level;

