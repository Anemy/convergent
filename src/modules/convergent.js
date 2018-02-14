import {
  generateInitialLayout,
  // generateLayoutBySeedAndVersion,
  generateRandomLayout
} from '../utils/layouts';

import {
  ALGORITHMS
} from '../constants';

import {
  loadInitialConfig
} from '../utils/config';

export const DONE_BUILDING = 'svg/DONE_BUILDING';
export const HISTORY_BACK = 'svg/HISTORY_BACK';
export const HISTORY_FORWARD = 'svg/HISTORY_FORWARD';
export const RANDOMIZE = 'svg/RANDOMIZE';
export const SET_RANDOMIZE_ALGORITHM = 'svg/SET_RANDOMIZE_ALGORITHM';
export const SET_SVG_REF = 'svg/SET_SVG_REF';
export const START_BUILDING = 'svg/START_BUILDING';
export const UPDATE_LAYOUT = 'svg/UPDATE_LAYOUT';
export const UPDATE_SVG = 'svg/UPDATE_SVG';

const maxHistoryLength = 1000;

const heightOfHeader = 0;

const minHeight = 200;
const minWidth = 200;

const clientWidth = window.innerWidth || document.body.clientWidth;
const clientHeight = document.body.clientHeight || window.innerHeight;

export const height = Math.max(Math.floor(clientHeight - heightOfHeader), minHeight);
export const width = Math.max(Math.floor(clientWidth), minWidth);

const initialConfig = loadInitialConfig();

const initialState = {
  height,
  history: [],
  future: [],
  isBuilding: false,
  present: generateInitialLayout(width, height),
  randomizationConfig: initialConfig,
  randomizeAlgorithm: ALGORITHMS.FULL_RANDOM,
  svgRef: null,
  width
};

export const randomizeVizual = () => ({
  type: RANDOMIZE
});

export default (state = initialState, action) => {
  switch (action.type) {
    case HISTORY_BACK:
      if (state.history && state.history.length > 0) {
        const newState = {
          ...state,
          isBuilding: true
        };

        newState.future.unshift({
          version: state.present.version,
          seed: state.present.seed
        });

        const newPresent = newState.history.shift();

        newState.present = {
          ...state.present,
          // ...generateLayoutBySeedAndVersion(width, height, newPresent.seed, newPresent.version)
        };

        if (newState.future.length > maxHistoryLength) {
          newState.future.pop();
        }

        return newState;
      } else {
        return {
          ...state
        };
      }

    case HISTORY_FORWARD:
      if (state.future && state.future.length > 0) {
        const newState = {
          ...state,
          isBuilding: true
        };

        newState.history.unshift({
          version: state.present.version,
          seed: state.present.seed
        });

        const newPresent = newState.future.shift();

        newState.present = {
          ...state.present,
          // ...generateLayoutBySeedAndVersion(width, height, newPresent.seed, newPresent.version)
        };

        if (newState.history.length > maxHistoryLength) {
          newState.history.pop();
        }

        return newState;
      } else {
        return {
          ...state
        };
      }

    case START_BUILDING: 
      return {
        ...state,
        isBuilding: true
      };

    case DONE_BUILDING:
      return {
        ...state,
        isBuilding: false
      };

    case RANDOMIZE:
      // Note: Not a deep copy.
      const newState = {
        ...state
      };

      newState.history.unshift({
        version: state.present.version,
        seed: state.present.seed
      });

      newState.present = {
        ...state.present,
        // ...generateRandomLayout(width, height, newState.randomizeAlgorithm)
      };

      if (newState.history.length > maxHistoryLength) {
        newState.history.pop();
      }

      return newState;

    case SET_RANDOMIZE_ALGORITHM:
      return {
        ...state,
        randomizeAlgorithm: action.algorithm
      };

    case SET_SVG_REF:
      return {
        ...state,
        svgRef: action.svgRef
      };

    default:
      return state;
  }
};

export const setSvgRef = svgRef => ({
  svgRef,
  type: SET_SVG_REF
});

export const historyBack = () => ({
  type: HISTORY_BACK
});

export const historyForward = () => ({
  type: HISTORY_FORWARD
});

export const updateVisual = update => ({
  update,
  type: UPDATE_SVG
});

export const startBuildingVisual = () => {
  return {
    type: START_BUILDING
  };
};

export const doneBuildingVisual = () => {
  return {
    type: DONE_BUILDING
  };
};

export const setRandomizeAlgorithm = algorithm => {
  return {
    algorithm,
    type: SET_RANDOMIZE_ALGORITHM
  }
};

export function updateLayout(update) {
  return {
    update,
    type: UPDATE_LAYOUT
  };
}