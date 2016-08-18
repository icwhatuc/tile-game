module.exports = {
  META: {
    START_GAME: 'START_GAME'
    , VIEW_SETTINGS: 'VIEW_SETTINGS'
    , UPDATE_SETTINGS: 'UPDATE_SETTINGS'
  }
  , MECHANICS: {
    TICK: 'TICK'
    , GENERATE_FALLING_BLOCK: 'GENERATE_FALLING_BLOCK'
    , APPLY_GRAVITY: 'APPLY_GRAVITY'
    , SHIFT_FALLING_BLOCK: 'SHIFT_FALLING_BLOCK'
    , ROTATE_FALLING_BLOCK: 'ROTATE_FALLING_BLOCK'
    , SPEED_UP_FALLING_BLOCK: 'SPEED_UP_FALLING_BLOCK'
    , ELIMINATE_LINES: 'ELIMINATE_LINES'
    , STORE_INTERVAL: 'STORE_INTERVAL'
    , CHECK_GAME_STATE: 'CHECK_GAME_STATE'
  }
  , BLOCK_TYPES: {
    LINE: 'LINE'
    , SQUARE: 'SQUARE'
  }
  , DEFAULT_BLOCK: 'LINE'
  , KEYEVENTS: {
    LEFT_SHIFT: 37
    , RIGHT_SHIFT: 39
    , DOWN_SHIFT: 40
    , SPEED_UP_TIME: 70 // 'f'
    , SLOW_DOWN_TIME: 83 // 's'
  }
  , INTERVAL_PERIOD_STEP_SIZE: 50
};

