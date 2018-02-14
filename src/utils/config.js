import _ from 'lodash';

import { CONFIGS } from '../constants/config';

export function loadInitialConfig() {
  const configurables = CONFIGS.INITIAL;

  _.each(configurables, (config, key) => {
    if (!config.initialRange) {
      config.initialRange = JSON.parse(JSON.stringify(config.possibleRange));
    }

    if (!config.range) {
      config.range = JSON.parse(JSON.stringify(config.initialRange));
    }
  });

  return configurables;
}
