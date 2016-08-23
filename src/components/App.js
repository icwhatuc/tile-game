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
    const {dispatch} = this.props;
    const keyMap = {
      [LEFT_SHIFT]: dispatch.bind(null, actions.shiftFallingBlock(LEFT_SHIFT))
      , [RIGHT_SHIFT]: dispatch.bind(null, actions.shiftFallingBlock(RIGHT_SHIFT))
      , [DOWN_SHIFT]: dispatch.bind(null, actions.speedUpFallingBlock())
      , [CLOCKWISE_ROTATION]: dispatch.bind(null, actions.rotateFallingBlock(CLOCKWISE_ROTATION))
      , [CCLOCKWISE_ROTATION]: dispatch.bind(null, actions.rotateFallingBlock(CCLOCKWISE_ROTATION))
      , [SPEED_UP_TIME]: dispatch.bind(null, actions.speedUpTime())
      , [SLOW_DOWN_TIME]: dispatch.bind(null, actions.slowDownTime())
      , [TOGGLE_GRAVITY]: dispatch.bind(null, actions.toggleGravity())
    };
    let action = keyMap[e.keyCode];
    
    if(action) {
      action();
      e.preventDefault();
    }
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

