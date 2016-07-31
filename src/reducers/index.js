import _ from 'lodash';

// TODO
const grid = [
    [2, 2, 0, 0, 0, 0, 0, 0, 0, 0]
    , [0, 4, 2, 0, 0, 0, 0, 0, 0, 0]
    , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    , [0, 0, 0, 0, 0, 32, 16, 0, 0, 0]
    , [0, 0, 0, 0, 0, 32, 32, 64, 0, 0]
];
const fallingBlock = [
    {position: [0,0], value: 2}
    , {position: [0,1], value: 2}
    , {position: [1,1], value: 4}
    , {position: [1,2], value: 2}
];

const initialState = {
  grid
  , fallingBlock
};

export default (state = initialState, action) => {
  const actionMap = {
    SET_GRID: updateStateWithGrid
  };

  let handler = actionMap[action.type];
  
  return handler ? handler(state, action.data) : state;
}

function updateStateWithGrid(state, grid) {
  return _.assign({}, state, {
    grid
  });
}

