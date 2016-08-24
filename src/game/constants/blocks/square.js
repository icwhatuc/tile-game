/*
 * definitions assume a 4 by 4 grid
 */
module.exports = {
  ROTATIONS: {
    0: [
      {position: {x:2, y:3}}
      , {position: {x:2, y:2}}
      , {position: {x:3, y:2}}
      , {position: {x:3, y:3}}
    ]
    , 90: [
      {position: {x:2, y:2}}
      , {position: {x:3, y:2}}
      , {position: {x:3, y:3}}
      , {position: {x:2, y:3}}
    ]
    , 180: [
      {position: {x:3, y:2}}
      , {position: {x:3, y:3}}
      , {position: {x:2, y:3}}
      , {position: {x:2, y:2}}
    ]
    , 270: [
      {position: {x:3, y:3}}
      , {position: {x:2, y:3}}
      , {position: {x:2, y:2}}
      , {position: {x:3, y:2}}
    ]
  }
  , BASE_OFFSET: {x:0, y:0}
};

