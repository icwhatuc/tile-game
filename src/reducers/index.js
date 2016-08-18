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
  , displayGrid: []
  , visibleGrid: []
  , lossFlag: false
  , intervalId: null
  , intervalPeriod: 1000
};


export default (state = initialState, action) => {
  // TODO: split up into separate reducers
  // and use combineReducers
  const actionMap = {
    TICK: tick
    , GENERATE_FALLING_BLOCK: generateFallingBlock
    , APPLY_GRAVITY: applyGravity
    , SHIFT_FALLING_BLOCK: shiftFallingBlock
    , ROTATE_FALLING_BLOCK: rotateFallingBlock
    , SPEED_UP_FALLING_BLOCK: speedUpFallingBlock
    , ELIMINATE_LINES: eliminateLines
    , CHECK_GAME_STATE: checkGameState
    , STORE_INTERVAL: storeInterval
  };

  let handler = actionMap[action.type];
  let updatedState = handler ?
    handler(state, action.data) :
    state;

  return computeGrid(updatedState);
}

function tick(state) {
  return _.assign({}, state, {
    tick: state.tick + 1
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
  let {grid, fallingBlock, blocks, gridSize} = state;
  let updatedFallingBlock = fallingBlock.map((tile) => {
    return BlockFactory.translateTile(tile, undefined, gravityStrength);
  });
  let isValidPosition = updatedFallingBlock.reduce((check, tile) => {
    let isOccupied = _.get(grid, [tile.position.y, tile.position.x]) > 0;
    return check
      // grid check
      && tile.position.y < gridSize.height
      && tile.position.y >= 0
      && tile.position.x < gridSize.width
      && tile.position.x >= 0
      // occupied check
      && !isOccupied;
  }, true);

  if(!isValidPosition) {
    blocks = blocks.concat([fallingBlock]);
    fallingBlock = BlockFactory.generateRandomBlock({gridSize});
  }
  else {
    fallingBlock = updatedFallingBlock;
  }

  return _.assign({}, state, {fallingBlock, blocks});
}

function shiftFallingBlock(state, direction) {
  let {grid, fallingBlock, gridSize} = state;
  let updatedFallingBlock;
  
  // TODO: check for edge cases
  switch(direction) {
    case CONSTANTS.KEYEVENTS.LEFT_SHIFT:
      updatedFallingBlock = fallingBlock.map((tile) => {
        return BlockFactory.translateTile(tile, -1, undefined);
      });
      break;
    case CONSTANTS.KEYEVENTS.RIGHT_SHIFT:
      updatedFallingBlock = fallingBlock.map((tile) => {
        return BlockFactory.translateTile(tile, 1, undefined);
      });
      break;
    case CONSTANTS.KEYEVENTS.DOWN_SHIFT:
      updatedFallingBlock = fallingBlock.map((tile) => {
        return BlockFactory.translateTile(tile, undefined, 1);
      });
      break;
  };

  let isValidPosition = updatedFallingBlock.reduce((check, tile) => {
    let isOccupied = _.get(grid, [tile.position.y, tile.position.x]) > 0;
    return check
      // grid check
      && tile.position.y < gridSize.height
      && tile.position.y >= 0
      && tile.position.x < gridSize.width
      && tile.position.x >= 0
      // occupied check
      && !isOccupied;
  }, true);

  return isValidPosition ? _.assign({}, state, {
    fallingBlock: updatedFallingBlock
  }) : state;
}

function rotateFallingBlock(state, direction) {
  return state;
}

function speedUpFallingBlock(state) {
  return state;
}

function eliminateLines(state) {
  let {grid, gridSize, blocks, fallingBlock} = state;
  let isNewFallingBlock = fallingBlock.reduce((newBlockFlag, tile) => {
    return newBlockFlag && tile.position.y < gridSize.hidden;
  }, true);

  if(!isNewFallingBlock) {
    return state;
  }

  let rowsToEliminate = grid.reduce((completedRows, gridRow, rowIdx) => {
    let isComplete = gridRow.reduce((completeFlag, gridCell) => {
      return completeFlag ? 
        gridCell !== null
        : false;
    }, true);
    if(isComplete) {
      completedRows[rowIdx] = true;
    }
    return completedRows;
  },  {});

  if(Object.keys(rowsToEliminate).length === 0) {
    return state;
  }

  let updatedBlocks = blocks.map((block) => {
    // eliminate tiles
    return block.filter((tile) => {
      return !rowsToEliminate[tile.position.y];
    })
    // shift remaining tiles down
    .map((tile) => {
      // tiles shift down based on how many rows below are eliminated
      let translateY = Object.keys(rowsToEliminate).reduce((count, eliminatedRowIdx) => {
        return tile.position.y < eliminatedRowIdx ? count + 1 : count;
      }, 0);
      return BlockFactory.translateTile(tile, 0, translateY);
    })
  })
  // eliminates blocks without any tiles left
  .filter((block) => {
    return block.length;
  });

  return _.assign({}, state, {
    blocks: updatedBlocks
  });
}

function storeInterval(state, data) {
  return _.assign({}, state, data);
}

function checkGameState(state) {
  let {grid, gridSize} = state;
  let updatedLossFlag = grid.slice(0, gridSize.hidden).reduce((check, row, y) => {
    return check ||
      row.reduce((rowCheck, cellValue, x) => {
        return rowCheck || cellValue > 0;
      }, false);
  }, false);
  return updatedLossFlag ?_.assign({}, state, {
    grid: []
    , visibleGrid: []
    , displayGrid: []
    , blocks: []
    , fallingBlock: []
    , lossFlag: true
  }) : state;
}

function computeGrid(state) {
  let grid = GridFactory.constructGrid(
    state.gridSize.height
    , state.gridSize.width
    , [state.fallingBlock].concat(state.blocks)
  );
  let displayGrid = GridFactory.constructGrid(
    state.gridSize.height
    , state.gridSize.width
    , [state.fallingBlock].concat(state.blocks)
    , {
        assignValues: true
    }
  );
  let visibleGrid = displayGrid.slice(state.gridSize.hidden);
  return _.assign({}, state, {
    grid
    , displayGrid
    , visibleGrid
  });
}

