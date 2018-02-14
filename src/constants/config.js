// const configDefaults = {
//   initialRange: '$possibleRange',
//   rangeType: 'random',
//   type: 'int',
// };

export const CONFIG_TYPES = {
  BOOLEAN: 'bool',
  COLOR: 'color',
  INT: 'int',
  NUMBER: 'number'
};

export const CONFIG_RANGE_TYPES = {
  LOG_INC: 'logarithmic-increasing'
}

const baseConfig = {
  background: {
    initialRange: {
      h: [0, 0],
      s: [0, 0],
      l: [0, 0]
    },
    possibleRange: {
      h: [0, 360],
      s: [0, 100],
      l: [0, 100]
    },
    type: CONFIG_TYPES.COLOR
  },
  connections: {
    initialRange: [0, 100],
    possibleRange: [0, 10000],
    rangeType: CONFIG_RANGE_TYPES.LOG_INC,
    rangeControlType: CONFIG_RANGE_TYPES.LOG_INC
  },
  points: {
    initialRange: [0, 100],
    possibleRange: [0, 10000],
    rangeType: CONFIG_RANGE_TYPES.LOG_INC,
    rangeControlType: CONFIG_RANGE_TYPES.LOG_INC
  },
  seed: {
    possibleRange: [0, 1000000]
  }
};

export const CONFIGS = {
  INITIAL: JSON.parse(JSON.stringify(baseConfig))
};
