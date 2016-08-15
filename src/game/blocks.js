import _ from 'lodash';
import CONSTANTS from '../constants';

const {BLOCKS} = CONSTANTS;
const {BLOCK_ROTATIONS} = CONSTANTS;
const {CLOCKWISE_ROTATION, CCLOCKWISE_ROTATION} = CONSTANTS.KEYEVENTS;
const {ROTATION_ORIENTATION} = CONSTANTS;
export function generateRandomBlock(options) {
  const gridHeight = _.get(options, 'gridSize.height') || 4;
  const gridWidth = _.get(options, 'gridSize.width') || 4;
  const gridHiddenHeight = _.get(options, 'gridSize.hidden') || 4;
  
  // generate a random block type
  let randomBlockType = generateRandomBlockType();
  let block = generateRandomBlockOfType(randomBlockType);
  // generate a configuration - rotation + position
  // rotation + position must be such that at least one tile
  block = rotateRandomly(block);

  /* TODO put back
  block = positionRandomly(block, {
    gridSize: {
      gridHeight: gridHiddenHeight
      , gridWidth
    }
  });
  */

  // assign random values to the tiles
  block = block.map((tile) => {
    let value 
    return _.assign({}, tile, {
      value: Math.random() < 0.9 ? 2 : 4
    });
  });

    debugger;

  return {
      block: block,
      blockProperties: {
          rotationOffset: {x:0, y:1} // TODO - have offset for position randomly and for different blocks
          , rotationOrientation: ROTATION_ORIENTATION.ZERO
          , type: randomBlockType
      }
  };
}

export function cloneBlock(block) {
  let cloneBlock = block.map((tile) => (cloneTile(tile)));
  debugger;
  return cloneBlock;
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

function rotateTileAroundPoint(tile, direction, centerPosition, gridWidth)
{
    let originx = tile.position.x - centerPosition.x;
    let originy = tile.position.y - centerPosition.y;
    
    let newx, newy;
    if (direction === CCLOCKWISE_ROTATION)
    {
        newx = originy + centerPosition.x;
        newy = -originx + centerPosition.y;
    }
    else if (direction === CLOCKWISE_ROTATION)
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

// note: rotationOffset is the offset of the 4x4 box
export function rotateBlock(block, direction, blockProperties, options) {

    // Rotation based on http://codeincomplete.com/posts/javascript-tetris/


    let {gridWidth} = options;
    let {type, rotationOrientation, rotationOffset} = blockProperties;

    debugger;
    /*
    let newBlock = block.map((tile) => {
        return rotateTileAroundPoint(tile, direction, centerPosition, gridWidth);
    });
    */

    // may have to refactor in the future if we want to rotate other blocks
    // IDEA for an item: be able to select any block and re place it! - will

    let newOrientation;
    switch(blockProperties.rotationOrientation){
        case ROTATION_ORIENTATION.ZERO:
            if (direction === CCLOCKWISE_ROTATION){
                newOrientation = ROTATION_ORIENTATION.TWO_SEVENTY;
            }
            else{
                newOrientation = ROTATION_ORIENTATION.NINETY;
            }
            break;
        case ROTATION_ORIENTATION.NINETY:
            if (direction === CCLOCKWISE_ROTATION){
                newOrientation = ROTATION_ORIENTATION.ZERO;
            }
            else{
                newOrientation = ROTATION_ORIENTATION.ONE_EIGHTY;
            }
            break;
        case ROTATION_ORIENTATION.ONE_EIGHTY:
            if (direction === CCLOCKWISE_ROTATION){
                newOrientation = ROTATION_ORIENTATION.NINETY;
            }
            else{
                newOrientation = ROTATION_ORIENTATION.TWO_SEVENTY;
            }
            break;
        case ROTATION_ORIENTATION.TWO_SEVENTY:
            if (direction === CCLOCKWISE_ROTATION){
                newOrientation = ROTATION_ORIENTATION.ONE_EIGHTY;
            }
            else{
                newOrientation = ROTATION_ORIENTATION.ZERO;
            }
            break;
        default:
            console.log("ERROR");
    }
    let rotationsForBlock = BLOCK_ROTATIONS[type][newOrientation];

    let length = rotationsForBlock.length;
    let newBlock = block; // TODO need to deep copy??

    debugger;
    for (let i=0; i<length; ++i)
    {
        newBlock[i].position.x = rotationsForBlock[i].position.x + rotationOffset.x;
        newBlock[i].position.y = rotationsForBlock[i].position.y + rotationOffset.y;
    }

    return {
        fallingBlock: newBlock,
        fallingBlockProperties: {
            rotationOffset: blockProperties.rotationOffset,
            rotationOrientation: newOrientation,
            type: type
        }
    };
}

