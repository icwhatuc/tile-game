import CONSTANTS from '../constants';

const {
  TICK
  , GENERATE_FALLING_BLOCK
  , APPLY_GRAVITY
  , SHIFT_FALLING_BLOCK
  , ROTATE_FALLING_BLOCK
  , SPEED_UP_FALLING_BLOCK
  , ELIMINATE_LINES
  , STORE_INTERVAL
  , CHECK_GAME_STATE
} = CONSTANTS.MECHANICS;

const {INTERVAL_PERIOD_STEP_SIZE} = CONSTANTS;

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
  return (dispatch) => {
    dispatch({type: TICK});
    dispatch(applyGravityToFallingBlock());
    dispatch(eliminateLines());
    dispatch(checkGameState());
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

export function eliminateLines() {
    return {
        type: ELIMINATE_LINES
    };
}

export function startTime() {
    return (dispatch, getState) => {
        let state = getState();
        let intervalId = setInterval(() => {
            dispatch(tick());
        }, state.intervalPeriod);
        dispatch({
            type: STORE_INTERVAL
            , data: {
                intervalId
            }
        });
    };
}

export function stopTime() {
    return (dispatch, getState) => {
        let state = getState();
        if(state.intervalId) {
          clearInterval(state.intervalId);
        }
        dispatch({
            type: STORE_INTERVAL
            , data: {
                intervalId: null
            }
        });
    };
}

export function speedUpTime() {
    return changeTime(-INTERVAL_PERIOD_STEP_SIZE);
}

export function slowDownTime() {
    return changeTime(INTERVAL_PERIOD_STEP_SIZE);
}

export function changeTime(stepSize) {
    return (dispatch, getState) => {
        let state = getState();
        let intervalPeriod = state.intervalPeriod + stepSize;
        let intervalId = state.intervalId;
        
        if(intervalId) {
          clearInterval(intervalId);
        }

        intervalId = setInterval(() => {
            dispatch(tick());
        }, intervalPeriod);
        
        dispatch({
            type: STORE_INTERVAL
            , data: {
                intervalId
                , intervalPeriod
            }
        });
    };
}

export function checkGameState() {
    return {
        type: CHECK_GAME_STATE
    };
}

