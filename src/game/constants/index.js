import GLOBAL_CONSTANTS from '../../constants';
import BLOCKS from './blocks';

const {KEYEVENTS} = GLOBAL_CONSTANTS;

module.exports = {
  BLOCKS
  , ROTATIONS: {
    CLOCKWISE_ROTATION: KEYEVENTS['CLOCKWISE_ROTATION']
    , CCLOCKWISE_ROTATION: KEYEVENTS['CCLOCKWISE_ROTATION']
  }
  , ORIENTATIONS: {
    ZERO: 0
    , NINETY: 90
    , ONE_EIGHTY: 180
    , TWO_SEVENTY: 270
  }
};
