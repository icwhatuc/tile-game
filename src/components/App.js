import React, { PropTypes } from 'react';
import Grid from '../components/grid';
import applyGravity from '../game/applyGravity';

import * as CONSTANTS from '../constants';
import * as actions from '../actions';

const {
  LEFT_SHIFT
  , RIGHT_SHIFT
  , DOWN_SHIFT
  , CLOCKWISE_ROTATION
  , CCLOCKWISE_ROTATION
  , TOGGLE_GRAVITY
} = CONSTANTS.KEYEVENTS;

class App extends React.Component {
  tick() {
    this.props.dispatch(actions.tick());
  }

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
      case CLOCKWISE_ROTATION:
        this.props.dispatch(actions.rotateFallingBlock(CLOCKWISE_ROTATION));
        break;
      case CCLOCKWISE_ROTATION:
        this.props.dispatch(actions.rotateFallingBlock(CCLOCKWISE_ROTATION));
        break;
      case TOGGLE_GRAVITY:
        this.props.dispatch(actions.toggleGravity());
        break;
    };
  }

  componentDidMount() {
    this.props.dispatch(actions.generateFallingBlock());  
    setInterval(this.tick.bind(this), 1000); // TODO: hardcoded interval
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

