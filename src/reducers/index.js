import _ from 'lodash';
import * as BlockFactory from '../game/blocks';
import * as GridFactory from '../game/grid';
import CONSTANTS from '../constants';

const initialState = {
  fallingBlock: []
  , blocks: []
  , gridSize: {
    width: 10
    , height: 14
    , hidden: 4
  }
  , tick: 0
  , grid: []
  , visibleGrid: []
  , gravityFlag: true
};


export default (state = initialState, action) => {
  // TODO: split up into separate reducers
  // and use combineReducers
  const actionMap = {
    SET_GRID: updateStateWithGrid
    , GENERATE_FALLING_BLOCK: generateFallingBlock
    , APPLY_GRAVITY: applyGravity
    , SHIFT_FALLING_BLOCK: shiftFallingBlock
    , ROTATE_FALLING_BLOCK: rotateFallingBlock
    , SPEED_UP_FALLING_BLOCK: speedUpFallingBlock
    , CHECK_GAME_STATE: checkGameState
    , TOGGLE_GRAVITY: toggleGravity
  };

  let handler = actionMap[action.type];
  let updatedState = handler ?
    handler(state, action.data) :
    state;

  return computeGrid(updatedState);
}

function updateStateWithGrid(state, grid) {
  return _.assign({}, state, {
    grid
  });
}

function generateFallingBlock(state) {
  return _.assign({}, state, {
    fallingBlock: BlockFactory.generateRandomBlock({
      gridSize: state.gridSize
    })
  });
}

function applyGravity(state) {
  // TODO - ultimately middleware will provide
  // a constructed grid that can be used here
  // Add a check to see if the fallingBlock overlaps with
  // any blocks in the grid after falling, if so don't
  // update it's position, add it to existing list of blocks,
  // and generate a new falling block
  let gravityStrength = 1;
  let fallingBlock = state.fallingBlock.map((tile) => {
    return BlockFactory.translateTile(tile, undefined, gravityStrength);
  });
  let gridHeight = state.gridSize.height;
  let offGrid = fallingBlock.reduce((check, tile) => {
    return check || tile.position.y >= gridHeight;
  }, false);
  let updatedState;
  
  fallingBlock = offGrid ? [] : fallingBlock;
  updatedState = _.assign({}, state, {tick: state.tick+1, fallingBlock});
  
  return offGrid ? 
    generateFallingBlock(updatedState) : // TODO: temp HACK - is there a better place for this
    updatedState;
}

function shiftFallingBlock(state, direction) {
  let updatedBlock;
  
  // TODO: check for edge cases
  switch(direction) {
    case CONSTANTS.KEYEVENTS.LEFT_SHIFT:
      updatedBlock = state.fallingBlock.map((tile) => {
        return BlockFactory.translateTile(tile, -1, undefined);
      });
      break;
    case CONSTANTS.KEYEVENTS.RIGHT_SHIFT:
      updatedBlock = state.fallingBlock.map((tile) => {
        return BlockFactory.translateTile(tile, 1, undefined);
      });
      break;
    case CONSTANTS.KEYEVENTS.DOWN_SHIFT:
      updatedBlock = state.fallingBlock.map((tile) => {
        return BlockFactory.translateTile(tile, undefined, 1);
      });
      break;
  };

  return _.assign({}, state, {
    fallingBlock: updatedBlock
  });
}

function rotateFallingBlock(state, direction) {
  return _.assign({}, state, {
    fallingBlock: BlockFactory.rotateBlock(state.fallingBlock, direction, {
      gridWidth: state.gridSize.width
    })
  });
}

function speedUpFallingBlock(state) {
  return state;
}

function checkGameState(state) {
  return state;
}

function computeGrid(state) {
  let grid = GridFactory.constructGrid(
    state.gridSize.height
    , state.gridSize.width
    , [state.fallingBlock].concat(state.blocks)
    , {
        assignValues: true
    }
  );
  let visibleGrid = grid.slice(state.gridSize.hidden);
  return _.assign({}, state, {
    grid
    , visibleGrid
  });
}

function toggleGravity(state) {
  return _.assign({}, state, {
    gravityFlag: !state.gravityFlag
  });
}

