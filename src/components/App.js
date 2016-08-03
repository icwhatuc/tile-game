import React, { PropTypes } from 'react';
import Grid from '../components/grid';
import applyGravity from '../game/applyGravity';

import * as actions from '../actions';

class App extends React.Component {
  tick() {
    this.props.dispatch(actions.applyGravityToFallingBlock());
  }

  componentDidMount() {
    this.props.dispatch(actions.generateFallingBlock());
    setInterval(this.tick.bind(this), 1000); // TODO: hardcoded interval
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

