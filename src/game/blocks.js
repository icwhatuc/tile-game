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
  let type = generateRandomBlockType();
  let block = generateRandomBlockOfType(type);
  let orientation = generateRandomOrientation();

  let randomXOffset = getRandomXOffset(block, {
    gridSize: {
      gridHeight: gridHiddenHeight
      , gridWidth
    }
  });
  let offset = _.assign({}, {
    x: BLOCK_ROTATION_OFFSETS[type].x + randomXOffset
    , y: BLOCK_ROTATION_OFFSETS[type].y
  });

  // position randomly
  block = block.map((tile) => (translateTile(tile, randomXOffset, 0)));

  // assign random values to the tiles
  block = block.map((tile) => {
    return _.assign({}, tile, {
      value: Math.random() < 0.9 ? 2 : 4 // TODO: hardcoded constants
    });
  });
  
  return applyOrientation({
    tiles: block
    , offset
    , type
  }, orientation);
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

function generateRandomOrientation() {
  let orientations = _.values(ROTATION_ORIENTATION); 
  return orientations[Math.floor(Math.random()*orientations.length)];
}

function getRandomXOffset(block, options) {
  let {gridWidth} = options.gridSize;
  let blockWidth = calculateBlockWidth(block);
  let validXRange = gridWidth - blockWidth;
  return Math.floor(Math.random()*validXRange);
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
export function rotateBlock(block, direction, options) {

    // Rotation based on http://codeincomplete.com/posts/javascript-tetris/


    let {gridWidth} = options;
    let {type, orientation, offset} = block;

    // may have to refactor in the future if we want to rotate other blocks
    // IDEA for an item: be able to select any block and re place it! - will

    let orderedOrientations = _.values(ROTATION_ORIENTATION)
        .sort((a, b) => (a - b));
    let updatedOrientation = orderedOrientations.find((o, index) => {
        let prevOrientation = orderedOrientations[(index - 1 + 4) % orderedOrientations.length];
        let nextOrientation = orderedOrientations[(index + 1 + 4) % orderedOrientations.length];

        return direction === CLOCKWISE_ROTATION && prevOrientation === orientation
          || direction === CCLOCKWISE_ROTATION && nextOrientation === orientation;

    });
    
    return applyOrientation(block, updatedOrientation);
}

export function applyOrientation(block, updatedOrientation) {
    let {type, offset} = block;
    let rotationsForBlock = BLOCK_ROTATIONS[type][updatedOrientation];
    return _.assign({}, block, {
      tiles: block.tiles.map((tile, index) => {
        return _.assign({}, tile, {
            position: {
                x: rotationsForBlock[index].position.x + offset.x
                , y: rotationsForBlock[index].position.y + offset.y
            }
        });
      })
      , orientation: updatedOrientation
    });
}

