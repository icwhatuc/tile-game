import React, { PropTypes } from 'react';
import Grid from '../components/grid';
import applyGravity from '../game/applyGravity';

import * as CONSTANTS from '../constants';
import * as actions from '../actions';

const {
  LEFT_SHIFT
  , RIGHT_SHIFT
} = CONSTANTS.KEYEVENTS;

class App extends React.Component {
  tick() {
    this.props.dispatch(actions.applyGravityToFallingBlock());
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

