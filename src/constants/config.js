// const configDefaults = {
//   initialRange: '$possibleRange',
//   rangeType: 'random',
//   type: 'int',
// };

export const CONFIG_TYPES = {
  ARRAY: 'array',
  BOOLEAN: 'bool',
  CIRCLE: 'circle',
  COLOR: 'color',
  INT: 'int',
  NUMBER: 'number',
  OBJECT: 'object',
  POSITION: 'position',
  RECTANGLE: 'rectangle'
};

export const CONFIG_RANGE_TYPES = {
  RANDOM: 'random',
  LOG_INC: 'logarithmic-increasing'
}

const baseConfig = {
  background: {
    initialRange: {
      h: [0, 0],
      s: [0, 0],
      l: [0, 0]
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
    items: {
      type: CONFIG_TYPES.CIRCLE
    },
    possibleRange: [0, 10000],
    rangeType: CONFIG_RANGE_TYPES.LOG_INC,
    rangeControlType: CONFIG_RANGE_TYPES.LOG_INC,
    type: CONFIG_TYPES.ARRAY
  },
  seed: {
    possibleRange: [0, 1000000]
  }
};

export const CONFIGS = {
  INITIAL: JSON.parse(JSON.stringify(baseConfig))
};
