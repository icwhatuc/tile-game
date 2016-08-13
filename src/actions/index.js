import CONSTANTS from '../constants';

const {
    GENERATE_FALLING_BLOCK
    , APPLY_GRAVITY
    , SHIFT_FALLING_BLOCK
    , ROTATE_FALLING_BLOCK
    , SPEED_UP_FALLING_BLOCK
    , CHECK_GAME_STATE
    , TOGGLE_GRAVITY
} = CONSTANTS.MECHANICS;

// TODO: remove
export function setGrid(grid) {
  return {
    type: 'SET_GRID'
    , data: grid
  };
}

export function generateFallingBlock() {
    return {
        type: GENERATE_FALLING_BLOCK
    };
}

export function tick() {
  return (dispatch, getState) => {
    let state = getState();
    if(state.gravityFlag) {
      dispatch(applyGravityToFallingBlock());
    }
  };
}

/*
 * IDEAS: can increase the effects of gravity
 */
export function applyGravityToFallingBlock() {
    return {
        type: APPLY_GRAVITY
    };
}

export function shiftFallingBlock(direction) {
    return {
        type: SHIFT_FALLING_BLOCK
        , data: direction
    };
}

export function rotateFallingBlock(direction) {
    return {
        type: ROTATE_FALLING_BLOCK
        , data: direction
    };
}

export function speedUpFallingBlock() {
    return {
        type: SPEED_UP_FALLING_BLOCK
    };
}

export function checkGameState() {
    return {
        type: CHECK_GAME_STATE
    };
}

export function toggleGravity() {
  return {
    type: TOGGLE_GRAVITY
  };
}

