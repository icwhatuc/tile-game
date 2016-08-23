import _ from 'lodash';
import * as BlockFactory from '../game/blocks';
import * as GridFactory from '../game/grid';
import CONSTANTS from '../constants';

const initialState = {
  fallingBlock: {
    tiles: []
    , type: null
    , offset: {x:0, y:0}
    , orientation: null
  }
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
  , gravityFlag: true
  , score: 0
  , level: 0
  , blocksEliminated: 0
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
    , TOGGLE_GRAVITY: toggleGravity
    , LEVEL_UP: levelUp
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

// This is only called once upon startup of the game
function generateFallingBlock(state) {
  let fallingBlock = BlockFactory.generateRandomBlock({
      gridSize:state.gridSize
  });
  return _.assign({}, state, {
    fallingBlock
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
  let updatedFallingBlock = _.assign({}, fallingBlock, {
    tiles: fallingBlock.tiles.map((tile) => {
      return BlockFactory.translateTile(tile, undefined, gravityStrength);
    })
    , offset: {
      x: fallingBlock.offset.x
      , y: fallingBlock.offset.y + gravityStrength
    }
  });


  let isValidPosition = isValidPositionForFallingBlock(state, updatedFallingBlock);

  if(!isValidPosition) {
    blocks = blocks.concat([fallingBlock.tiles]);
    // TODO - call the function above to generate a random block
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
  
  switch(direction) {
    case CONSTANTS.KEYEVENTS.LEFT_SHIFT:
      updatedFallingBlock = _.assign({}, fallingBlock, {
        tiles: fallingBlock.tiles.map((tile) => {
          return BlockFactory.translateTile(tile, -1, 0);
        })
        , offset: {
          x: fallingBlock.offset.x - 1
          , y: fallingBlock.offset.y
        }
      });
      break;
    case CONSTANTS.KEYEVENTS.RIGHT_SHIFT:
      updatedFallingBlock = _.assign({}, fallingBlock, {
        tiles: fallingBlock.tiles.map((tile) => {
          return BlockFactory.translateTile(tile, 1, 0);
        })
        , offset: {
          x: fallingBlock.offset.x + 1
          , y: fallingBlock.offset.y
        }
      });
      break;
    case CONSTANTS.KEYEVENTS.DOWN_SHIFT:
      updatedFallingBlock = _.assign({}, fallingBlock, {
        tiles: fallingBlock.tiles.map((tile) => {
          return BlockFactory.translateTile(tile, 0, 1);
        })
        , offset: {
          x: fallingBlock.offset.x
          , y: fallingBlock.offset.y + 1
        }
      });
      break;
  };

  let isValidPosition = isValidPositionForFallingBlock(state, updatedFallingBlock);

  return isValidPosition ? _.assign({}, state, {
    fallingBlock: updatedFallingBlock
  }) : state;
}

function rotateFallingBlock(state, direction) {
  let gridWidth = state.gridSize.width;
  let gridHeight = state.gridSize.height;
  let updatedFallingBlock = BlockFactory.rotateBlock(
    state.fallingBlock
    , direction
    , {
      gridWidth
    });
  
  // shift IF necessary
  updatedFallingBlock = shiftFallingBlockIntoGrid(updatedFallingBlock, gridWidth, gridHeight);

  let isValidPosition = isValidPositionForFallingBlock(state, updatedFallingBlock);

  return isValidPosition ? _.assign({}, state, {
    fallingBlock: updatedFallingBlock
  }) : state;
}

function speedUpFallingBlock(state) {
  let updatedFallingBlock
    , prevPositionedBlock = state.fallingBlock;
  let isValidPosition = true;
  
  while(isValidPosition) {
    updatedFallingBlock = prevPositionedBlock;
    prevPositionedBlock = _.assign({}, updatedFallingBlock, {
      tiles: updatedFallingBlock.tiles.map((tile) => {
        return BlockFactory.translateTile(tile, 0, 1);
      })
      , offset: {
        x: updatedFallingBlock.offset.x
        , y: updatedFallingBlock.offset.y + 1
      }
    });
    isValidPosition = isValidPositionForFallingBlock(state, prevPositionedBlock);
  }

  return _.assign({}, state, {
    fallingBlock: updatedFallingBlock
  });
}

function eliminateLines(state) {
  let {grid, gridSize, blocks, fallingBlock} = state;
  let isNewFallingBlock = fallingBlock.tiles.reduce((newBlockFlag, tile) => {
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
    , score: computeNewScore(state, Object.keys(rowsToEliminate).length)
    , blocksEliminated: computeBlocksEliminated(state, Object.keys(rowsToEliminate).length * state.gridSize.width)
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
  return updatedLossFlag ? _.assign({}, state, {
    grid: []
    , visibleGrid: []
    , displayGrid: []
    , blocks: []
    , fallingBlock: {
      tiles: []
      , type: null
      , offset: {x:0, y:0}
      , orientation: null
    }
    , lossFlag: true
  }) : state;
}

function computeGrid(state) {
  let grid = GridFactory.constructGrid(
    state.gridSize.height
    , state.gridSize.width
    , [state.fallingBlock.tiles].concat(state.blocks)
  );
  let displayGrid = GridFactory.constructGrid(
    state.gridSize.height
    , state.gridSize.width
    , [state.fallingBlock.tiles].concat(state.blocks)
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

function toggleGravity(state) {
  return _.assign({}, state, {
    gravityFlag: !state.gravityFlag
  });
}

function levelUp(state, updatedLevel) {
  return _.assign({}, state, {
    level: updatedLevel
  });
}

function shiftFallingBlockIntoGrid(updatedFallingBlock, gridWidth, gridHeight) {
  let minX = updatedFallingBlock.tiles.reduce((min, tile) => {
    return tile.position.x < min ? tile.position.x : min;
  }, Infinity);
  let maxX = updatedFallingBlock.tiles.reduce((max, tile) => {
    return tile.position.x > max ? tile.position.x : max;
  }, -Infinity);
  let maxY = updatedFallingBlock.tiles.reduce((max, tile) => {
    return tile.position.y > max ? tile.position.y : max;
  }, -Infinity);
  let offsetX = 0, offsetY = 0;

  if(minX < 0) {
    offsetX = -(minX);
  }
  else if(maxX >= gridWidth) {
    offsetX = maxX-gridWidth-1;
  }

  if(maxY >= gridHeight) {
    offsetY = maxY-gridHeight-1;
  }
  
  if(offsetX || offsetY) {
    updatedFallingBlock = _.assign({}, updatedFallingBlock, {
      tiles: updatedFallingBlock.tiles.map((tile) => (BlockFactory.translateTile(tile, offsetX, offsetY)))
      , offset: {
        x: updatedFallingBlock.offset.x + offsetX
        , y: updatedFallingBlock.offset.y + offsetY
      }
    });
  }

  return updatedFallingBlock;
}

function isValidPositionForFallingBlock(state, updatedFallingBlock) {
  let {grid, gridSize} = state;
  return updatedFallingBlock.tiles.reduce((check, tile) => {
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
}

function computeNewScore(state, basePoints) {
    return basePoints + state.score;
}

function computeBlocksEliminated(state, blocksEliminated) {
    return blocksEliminated + state.blocksEliminated;
}

