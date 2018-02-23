import _ from 'lodash';
import MersenneTwister from 'mersennetwister';

import {
  CONFIG_TYPES,
  // CONFIG_RANGE_TYPES
} from '../constants/config';

export function generateInitialLayout(config) {
  // Load the configurables from the url or the initial.
  return {
    ...config
  };
}

export function generateLayoutUsingConfig(width, height, configurables) {
  const seed = Math.floor(configurables.seed.range[0] + (Math.random() * (configurables.seed.range[1] - configurables.seed.range[0])));

  return generateLayoutUsingConfigAndSeed(width, height, configurables, seed);
}

function getRandomForRange(configType, rangeType, range, seeder) {
  const random = range[0] + (seeder.rnd() * (range[1] - range[0]));;
  
  // TODO: Handle different kinds of point generation based on the range type.
  // Things like circle, rectangle, different distributions, sin, cos, spiral, concentric

  if (configType === CONFIG_TYPES.NUMBER) {
    return random;
  }

  return Math.floor(random);
}

function buildLayoutItem(width, height, configurables, config, seeder) {
  const configType = config.type;
  const range = config.range;
  const rangeType = config.rangeType;

  if (config.type === CONFIG_TYPES.POSITION) {
    return {
      value: {
        x: getRandomForRange(configType, rangeType, range, seeder),
        y: getRandomForRange(configType, rangeType, range, seeder)
      },
      set: false,
      type: CONFIG_TYPES.NUMBER
    };
  } else if (config.type === CONFIG_TYPES.OBJECT) {
    const objectValues = [];

    _.each(config.items, (item, key) => {
      objectValues[key] = buildLayoutItem(width, height, configurables, item, seeder);
    });
    
    return {
      value: objectValues,
      set: false,
      type: CONFIG_TYPES.ARRAY
    };
  } else if (config.type === CONFIG_TYPES.ARRAY) {
    const arrayValues = [];
    const amountOfItems = getRandomForRange(configType, rangeType, range, seeder);

    for (let i = 0; i < amountOfItems; i++) {
      arrayValues.push(buildLayoutItem(width, height, configurables, config.items, seeder));
    }
    
    return {
      value: arrayValues,
      set: false,
      type: CONFIG_TYPES.ARRAY
    };
  } else if (config.type === CONFIG_TYPES.CIRCLE) {
    return {
      value: {
        x: getRandomForRange(configType, rangeType, range.x, seeder),
        y: getRandomForRange(configType, rangeType, range.y, seeder),
        r: getRandomForRange(configType, rangeType, range.r, seeder),
        h: getRandomForRange(configType, rangeType, range.h, seeder),
        s: getRandomForRange(configType, rangeType, range.s, seeder),
        l: getRandomForRange(configType, rangeType, range.l, seeder)
      },
      set: false,
      type: CONFIG_TYPES.COLOR
    };
  } else if (config.type === CONFIG_TYPES.COLOR) {
    return {
      value: {
        h: getRandomForRange(configType, rangeType, range.h, seeder),
        s: getRandomForRange(configType, rangeType, range.s, seeder),
        l: getRandomForRange(configType, rangeType, range.l, seeder)
      },
      set: false,
      type: CONFIG_TYPES.COLOR
    };
  } else if (config.type === CONFIG_TYPES.RECTANGLE) {
    return {
      value: {
        h: getRandomForRange(configType, rangeType, range.h, seeder),
        s: getRandomForRange(configType, rangeType, range.s, seeder),
        l: getRandomForRange(configType, rangeType, range.l, seeder)
      },
      set: false,
      type: CONFIG_TYPES.COLOR
    };
  } else if (config.type === CONFIG_TYPES.NUMBER) {
    return {
      value: getRandomForRange(configType, rangeType, range, seeder),
      set: false,
      type: CONFIG_TYPES.NUMBER
    };
  } else { // Default -> config.type === CONFIG_TYPES.INT
    return {
      value: Math.floor(getRandomForRange(configType, rangeType, range, seeder)),
      set: false,
      type: CONFIG_TYPES.INT
    };
  }
}

export function generateLayoutUsingConfigAndSeed(width, height, configurables, seed) {
  const layout = {
    randomizationConfig: configurables,
    seed: {
      value: seed,
      set: false
    }
  };

  const seeder = new MersenneTwister(seed);

  // This could be more performant, it's currently resizing layout on every new addition, which we could make not happen with better coding lol.
  _.each(configurables, (config, key) => {
    if (key === 'seed') {
      // We've already handled the seed.
      return;
    }

    layout[key] = buildLayoutItem(width, height, configurables, config, seeder);
  });

  return layout;
}
