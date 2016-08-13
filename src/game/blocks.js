import _ from 'lodash';
import CONSTANTS from '../constants';

const {BLOCKS} = CONSTANTS;

export function generateRandomBlock(options) {
  const gridHeight = _.get(options, 'gridSize.height') || 4;
  const gridWidth = _.get(options, 'gridSize.width') || 4;
  const gridHiddenHeight = _.get(options, 'gridSize.hidden') || 4;
  
  // generate a random block type
  let block = generateRandomBlockOfType(generateRandomBlockType());
  // generate a configuration - rotation + position
  // rotation + position must be such that at least one tile
  block = rotateRandomly(block);
  block = positionRandomly(block, {
    gridSize: {
      gridHeight: gridHiddenHeight
      , gridWidth
    }
  });
  // assign random values to the tiles
  block = block.map((tile) => {
    let value 
    return _.assign({}, tile, {
      value: Math.random() < 0.9 ? 2 : 4
    });
  });

  return block;
}

export function cloneBlock(block) {
  return block.map((tile) => (cloneTile(tile)));
}

export function cloneTile(tile) {
  return _.assign({}, tile);
}

function generateRandomBlockType() {
  let blockTypes = Object.keys(BLOCKS);
  return blockTypes[Math.floor(Math.random()*blockTypes.length)];
}

function generateRandomBlockOfType(type) {
  return cloneBlock(BLOCKS[type]);
}

function rotateRandomly(block) {
  // TODO
  return block;
}

function positionRandomly(block, options) {
  let {gridWidth} = options.gridSize;
  let blockWidth = calculateBlockWidth(block);
  let validXRange = gridWidth - blockWidth;
  let offset = Math.floor(Math.random()*validXRange);
  return block.map((tile) => (translateTile(tile, offset, undefined)));
}

export function translateTile(tile, offsetx = 0, offsety = 0) {
  return _.assign({}, tile, {
    position: {
      x: tile.position.x + offsetx
      , y: tile.position.y + offsety
    }
  });
}



function calculateBlockWidth(block) {
  return calculateRangeGivenProp(block, 'x') + 1;
}

function calculateBlockHeight(block) {
  return calculateRangeGivenProp(block, 'y') + 1;
}

function calculateRangeGivenProp(block, prop) {
  let min = block.reduce((currMin, tile) => {
    return Math.min(currMin, tile.position[prop]);
  }, Infinity);
  let max = block.reduce((currMax, tile) => {
    return Math.max(currMax, tile.position[prop]);
  }, -Infinity);
  return max - min;
}

function findCenterPosition(block) {
    let sumx = block.reduce((currSum, tile) => {
        return currSum + tile.position.x;
    }, 0);
    let sumy = block.reduce((currSum, tile) => {
        return currSum + tile.position.y;
    }, 0);

    let blockLength = block.length;
    let centerPosition = {
        x: Math.floor(sumx/blockLength),
        y: Math.ceil(sumy/blockLength)
    };
    return centerPosition;
}

function rotateFunctionAroundPoint(tile, direction, centerPosition, gridWidth)
{
    console.log(tile.position.x);
    console.log(tile.position.y);
    console.log(centerPosition.y);
    console.log(tile.position.x+centerPosition.y);
    
    let originx = tile.position.x - centerPosition.x;
    let originy = tile.position.y - centerPosition.y;
    
    
    let newx, newy;
    if (direction==CONSTANTS.CCLOCKWISE_ROTATION)
    {
        newx = originy + centerPosition.x;
        newy = -originx + centerPosition.y;
    }
    else if (direction==CONSTANTS.CLOCKWISE_ROTATION)
    {
        newx = originy + centerPosition.x;
        newy = originx + centerPosition.y;
    }

    return {
        position: {
            x: newx,
            y: newy,
        },
        value: tile.value
    };
}

export function rotateBlock(block, direction, options) {
    let {gridWidth} = options;

    let centerPosition = findCenterPosition(block);

    let newBlock = block.map((tile) => {
        console.log(tile);
        console.log("---");
        return rotateFunctionAroundPoint(tile, direction, centerPosition, gridWidth);
    });

    console.log(centerPosition);

    console.log(newBlock);
    return newBlock;
}

