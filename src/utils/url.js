import _ from 'lodash';

import { ALGORITHMS } from '../constants';

function getParameterByName(name, url) {
  const sanitizedName = name.replace(/[[\]]/g, '\\$&');

  const regex = new RegExp('[?&]' + sanitizedName + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url || window.location.href);

  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function getSharingSeedFromURL() {
  const sharedShapeString = getParameterByName('shared');

  if (sharedShapeString && isNumeric(sharedShapeString)) {
    return Number(sharedShapeString);
  }

  return false;
}

export function getSharingVersionFromURL() {
  const urlVersion = getParameterByName('v');

  if (!urlVersion) {
    return false;
  }

  let versionIndex = '';
  const versionExists = _.some(ALGORITHMS, version => {
    if (urlVersion === version) {
      versionIndex = version;
      return true;
    }
  });

  if (versionExists) {
    return versionIndex;
  }
}