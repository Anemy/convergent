// const configDefaults = {
//   initialRange: '$possibleRange',
//   rangeType: 'random',
//   type: 'int',
// };

const baseConfig = {
  background: {
    initialRange: [0, 0, 0],
    possibleRange: [360, 100, 100],
    rangeType: 'logarithmic-increasing',
    type: 'color'
  },
  connections: {
    initialRange: [0, 100],
    rangeType: 'logarithmic-increasing',
    type: 'int'
  },
  points: {
    initialRange: [0, 100],
    possibleRange: [0, 10000],
    type: 'int'
  },
  seed: {
    possibleRange: [0, 1000000],
    type: 'int'
  }
};

export const CONFIGS = {
  INITIAL: baseConfig
};
