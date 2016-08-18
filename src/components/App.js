import React, { PropTypes } from 'react';
import Grid from '../components/grid';
import applyGravity from '../game/applyGravity';

import * as CONSTANTS from '../constants';
import * as actions from '../actions';

const {
  LEFT_SHIFT
  , RIGHT_SHIFT
  , DOWN_SHIFT
  , SPEED_UP_TIME
  , SLOW_DOWN_TIME
} = CONSTANTS.KEYEVENTS;

class App extends React.Component {
  onKeyDown(e) {
    e.preventDefault();
    switch(e.keyCode) {
      case LEFT_SHIFT:
        this.props.dispatch(actions.shiftFallingBlock(LEFT_SHIFT));
        break;
      case RIGHT_SHIFT:
        this.props.dispatch(actions.shiftFallingBlock(RIGHT_SHIFT));
        break;
      case DOWN_SHIFT:
        this.props.dispatch(actions.shiftFallingBlock(DOWN_SHIFT));
        break;
      case SPEED_UP_TIME:
        this.props.dispatch(actions.speedUpTime());
        break;
      case SLOW_DOWN_TIME:
        this.props.dispatch(actions.slowDownTime());
        break;
    };
  }

  componentDidMount() {
    this.props.dispatch(actions.generateFallingBlock());
    this.props.dispatch(actions.startTime());
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  render () {
    return (
      <div style={{ height: '100%' }}>
        <Grid {...this.props}/>
      </div>
    )
  }
}

export default App;

