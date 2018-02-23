import _ from 'lodash';

import { CONFIGS, CONFIG_RANGE_TYPES, CONFIG_TYPES } from '../constants/config';

// This mutates `config` and is recursive.
function loadConfigItem(config) {
  if (config.type === CONFIG_TYPES.ARRAY) {
    loadConfigItem(config.items);
  } else if (config.type === CONFIG_TYPES.OBJECT) {
    loadConfigItem(config.items);
  }

  if (!config.initialRange) {
    if (!config.possibleRange) {
      if (config.type === CONFIG_TYPES.COLOR) {
        config.possibleRange = {
          h: [0, 361],
          s: [0, 101],
          l: [0, 101]
        };
      } else if (config.type === CONFIG_TYPES.CIRCLE) {
        config.possibleRange = {
          // TODO: Width n height - or some enum for?
          x: [0, 1000],
          y: [0, 1000],
          h: [0, 361],
          s: [0, 101],
          l: [0, 101]
        };
      }
    }

    config.initialRange = JSON.parse(JSON.stringify(config.possibleRange));
  }

  if (!config.range) {
    config.range = JSON.parse(JSON.stringify(config.initialRange));
  }

  if (!config.rangeType) {
    config.rangeType = CONFIG_RANGE_TYPES.RANDOM;
  }

  if (!config.rangeControlType) {
    config.rangeControlType = CONFIG_RANGE_TYPES.RANDOM;
  }
}

export function loadInitialConfig() {
  const configurables = CONFIGS.INITIAL;

  _.each(configurables, config => loadConfigItem(config));

  return configurables;
}
