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
    , TOGGLE_GRAVITY: 'TOGGLE_GRAVITY'
  }
  , BLOCKS: {
    /*
     * definitions assume a 4 by 4 grid
     */
    /*
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
    , */ LBLOCK: [
      {position: {x:1, y:1}}
      , {position: {x:1, y:2}}
      , {position: {x:1, y:3}}
      , {position: {x:2, y:3}}
    ]
  }
  , BLOCK_ROTATIONS: {
    LBLOCK: [
      [
        {position: {x:1, y:1}}
        , {position: {x:1, y:2}}
        , {position: {x:1, y:3}}
        , {position: {x:2, y:3}}
      ]
      , [
        {position: {x:2, y:2}}
        , {position: {x:1, y:2}}
        , {position: {x:0, y:2}}
        , {position: {x:0, y:3}}
      ]
      , [
        {position: {x:1, y:3}}
        , {position: {x:1, y:2}}
        , {position: {x:1, y:1}}
        , {position: {x:0, y:1}}
      ]
      , [
        {position: {x:0, y:2}}
        , {position: {x:1, y:2}}
        , {position: {x:2, y:2}}
        , {position: {x:2, y:1}}
      ]
    ]
  }
  , BLOCK_ROTATION_OFFSETS: {
    LBLOCK: {x:0, y:1}
  }
  , ROTATION_ORIENTATION: {
    ZERO: 0
    , NINETY: 1
    , ONE_EIGHTY: 2
    , TWO_SEVENTY: 3
  }
  , DEFAULT_BLOCK: 'LINE'
  , KEYEVENTS: {
    LEFT_SHIFT: 37
    , RIGHT_SHIFT: 39
    , DOWN_SHIFT: 40
    , SPEED_UP_TIME: 70 // 'f'
    , SLOW_DOWN_TIME: 83 // 's'
    , CLOCKWISE_ROTATION: 67
    , CCLOCKWISE_ROTATION: 88
    , TOGGLE_GRAVITY: 71
  }
  , BLOCKS_PER_LEVEL: 100
  , INTERVAL_PERIOD_STEP_SIZE: 50
};

