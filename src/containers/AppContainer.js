import React, { PropTypes } from 'react';
import Grid from '../components/grid';

const data = [
    [1, 2, 3, 4, 5]
];

class AppContainer extends React.Component {
  render () {
    let gridProps = {data};
    return (
      <div style={{ height: '100%' }}>
        <Grid {...gridProps}/>
      </div>
    )
  }
}

export default AppContainer;

