import _ from 'lodash';
import CONSTANTS from '../constants';

const {BLOCKS} = CONSTANTS;
const {BLOCK_ROTATIONS} = CONSTANTS;
const {BLOCK_ROTATION_OFFSETS} = CONSTANTS;
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

  let rotationOffset = _.assign({}, BLOCK_ROTATION_OFFSETS[randomBlockType]);

  return {
      block: block,
      blockProperties: {
          rotationOffset: rotationOffset
          , rotationOrientation: ROTATION_ORIENTATION.ZERO
          , type: randomBlockType
      }
  };
}

export function cloneBlock(block) {
  let cloneBlock = block.map((tile) => (cloneTile(tile)));
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

// note: rotationOffset is the offset of the 4x4 box
export function rotateBlock(block, direction, blockProperties, options) {

    // Rotation based on http://codeincomplete.com/posts/javascript-tetris/


    let {gridWidth} = options;
    let {type, rotationOrientation, rotationOffset} = blockProperties;

    // may have to refactor in the future if we want to rotate other blocks
    // IDEA for an item: be able to select any block and re place it! - will

    let orderedOrientations = Object.keys(ROTATION_ORIENTATION)
        .sort((a, b) => (ROTATION_ORIENTATION[a] - ROTATION_ORIENTATION[b]))
        .map((orientationName) => (ROTATION_ORIENTATION[orientationName]));

    let newOrientation = orderedOrientations.reduce((prev, orientation, index) => {
            if(orientation === blockProperties.rotationOrientation) {
                return direction === CLOCKWISE_ROTATION ?
                    orderedOrientations[(index + 1 + 4)%4] :
                    orderedOrientations[(index - 1 + 4)%4];
            }
            return prev;
        }, undefined);
    
    let rotationsForBlock = BLOCK_ROTATIONS[type][newOrientation];
    let newBlock = block.map((tile, index) => {
        return _.assign({}, tile, {
            position: {
                x: rotationsForBlock[index].position.x + rotationOffset.x
                , y: rotationsForBlock[index].position.y + rotationOffset.y
            }
        });
    });

    return {
        fallingBlock: newBlock,
        fallingBlockProperties: {
            rotationOffset: blockProperties.rotationOffset,
            rotationOrientation: newOrientation,
            type: type
        }
    };
}

