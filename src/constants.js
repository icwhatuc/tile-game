module.exports = {
  META: {
    START_GAME: 'START_GAME'
    , VIEW_SETTINGS: 'VIEW_SETTINGS'
    , UPDATE_SETTINGS: 'UPDATE_SETTINGS'
  }
  , MECHANICS: {
    GENERATE_FALLING_BLOCK: 'GENERATE_FALLING_BLOCK'
    , APPLY_GRAVITY: 'APPLY_GRAVITY'
    , SHIFT_FALLING_BLOCK: 'SHIFT_FALLING_BLOCK'
    , ROTATE_FALLING_BLOCK: 'ROTATE_FALLING_BLOCK'
    , SPEED_UP_FALLING_BLOCK: 'SPEED_UP_FALLING_BLOCK'
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
      {position: {x:0, y:1}}
      , {position: {x:0, y:2}}
      , {position: {x:0, y:3}}
      , {position: {x:1, y:3}}
    ]
  }
  , DEFAULT_BLOCK: 'LINE'
  , KEYEVENTS: {
    LEFT_SHIFT: 37
    , RIGHT_SHIFT: 39
    , DOWN_SHIFT: 40
    , CLOCKWISE_ROTATION: 67
    , CCLOCKWISE_ROTATION: 88
    , TOGGLE_GRAVITY: 71
  }
};

