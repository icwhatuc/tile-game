import React, { PropTypes } from 'react';
import Grid from '../components/grid';
import Score from './score';
import Level from './level';
import BlocksEliminated from './blocksEliminated';
import applyGravity from '../game/applyGravity';

import * as CONSTANTS from '../constants';
import * as actions from '../actions';

const {
  LEFT_SHIFT
  , RIGHT_SHIFT
  , DOWN_SHIFT
  , SPEED_UP_TIME
  , SLOW_DOWN_TIME
  , CLOCKWISE_ROTATION
  , CCLOCKWISE_ROTATION
  , TOGGLE_GRAVITY
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
    this.props.dispatch(actions.startTime());
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  render () {
    return (
      <div style={{ height: '100%' }}>
        <Level value={this.props.level}/>
        <BlocksEliminated value={this.props.blocksEliminated}/>
        <Score value={this.props.score}/>
        <Grid {...this.props}/>
      </div>
    )
  }
}

export default App;

