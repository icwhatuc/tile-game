import React, { PropTypes } from 'react';
import Grid from '../components/grid';
import applyGravity from '../game/applyGravity';

import * as actions from '../actions';

class App extends React.Component {
  updateGrid() {
    let {grid, fallingBlock} = this.props;
    let updatedGrid = applyGravity(grid);
    this.props.dispatch(actions.setGrid(updatedGrid));
  }

  componentDidMount() {
    setInterval(this.updateGrid.bind(this), 1000);
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

