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

export function generateLayoutUsingConfigAndSeed(width, height, configurables, seed) {
  const newLayout = {
    randomizationConfig: configurables,
    seed: {
      value: seed,
      set: false
    }
  };

  const seeder = new MersenneTwister(seed);

  // This could be more performant, it's currently resizing newLayout on every new addition, which we could make not happen with better coding lol.
  _.each(configurables, (config, key) => {
    if (key === 'seed') {
      // We've already handled the seed.
      return;
    }

    const range = config.range;

    if (config.type === CONFIG_TYPES.COLOR) {
      Math.floor(range[0] + (seeder.rnd() * (range[1] - range[0])));
      newLayout[key] = {
        value: {
          h: Math.floor(range.h[0] + (seeder.rnd() * (range.h[1] - range.h[0]))),
          s: Math.floor(range.s[0] + (seeder.rnd() * (range.s[1] - range.s[0]))),
          l: Math.floor(range.l[0] + (seeder.rnd() * (range.l[1] - range.l[0])))
        },
        set: false
      }
    } else { // Default -> config.type === 'number'
      newLayout[key] = {
        value: Math.floor(range[0] + (seeder.rnd() * (range[1] - range[0]))),
        set: false
      }
    }
  });

  return newLayout;
}
