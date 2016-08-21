import React, { PropTypes } from 'react';

class Score extends React.Component {
  render () {
    let displayValue = this.props.value;
    return (
      <div className="Score">
        {displayValue}
      </div>
    )
  }
}

export default Score;

