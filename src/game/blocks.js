import _ from 'lodash';
import CONSTANTS from '../constants';

const {
  LINE
  , SQUARE
} = CONSTANTS.BLOCK_TYPES;
const {DEFAULT_BLOCK} = CONSTANTS;

/*
 * definitions assume a 4 by 4 grid
 */
const BLOCK_DEFINITIONS = {
  LINE: [
    {position: {x: 0, y: 0}}
    , {position: {x: 0, y: 1}}
    , {position: {x: 0, y: 2}}
    , {position: {x: 0, y: 3}}
  ]
  , SQUARE: [
    {position: {x: 0, y: 2}}
    , {position: {x: 1, y: 2}}
    , {position: {x: 0, y: 3}}
    , {position: {x: 1, y: 3}}
  ]
};

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
  let blockTypes = Object.keys(CONSTANTS.BLOCK_TYPES);
  return blockTypes[Math.floor(Math.random()*blockTypes.length)];
}

function generateRandomBlockOfType(type) {
  return cloneBlock(BLOCK_DEFINITIONS[type]);
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



export function rotateBlock(block, direction, options) {
  let {gridWidth} = options;
  return block;
}

