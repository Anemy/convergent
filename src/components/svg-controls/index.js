import _ from 'lodash';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
// import MenuItem from 'material-ui/MenuItem';
// import Subheader from 'material-ui/Subheader';
// import SelectField from 'material-ui/SelectField';
// import Toggle from 'material-ui/Toggle';
import React, { Component } from 'react';
// import { CompactPicker } from 'react-color';
import { connect } from 'react-redux';

// import {
//   updateVisual,
//   setRandomizeAlgorithm
// } from '../../modules/convergent';

// import { ALGORITHMS } from '../../constants';

import { createColorString, getContrastingBinaryColor } from '../../utils/color';

import './index.css';

import LayoutControl from './layout-control';
import RandomizationControl from './randomization-control';

class SvgControls extends Component {
  // handleAlgorithmChange = (event, index, value) => {
  //   this.props.setRandomizeAlgorithm(value);
  // }

  renderLayoutControls() {
    const {
      layout
    } = this.props;

    return _.map(layout, (layoutItem, settingIndex) => {
      if (settingIndex !== 'randomizationConfig') {
        return <LayoutControl
          key={settingIndex}
          settingIndex={settingIndex}
        />;
      }
    });
  }

  renderRandomizationConfig() {
    const {
      randomizationConfig
    } = this.props;

    return _.map(randomizationConfig, (config, configIndex) => {
      return <RandomizationControl
        key={configIndex}
        configIndex={configIndex}
      />;
    });
  }

  render() {
    return (
      <div className="convergent-js-svg-controls">
        <List>
          <div className="convergent-js-svg-controls-about">
            <div className="convergent-js-svg-controls-about-desc">
              Coded by <a
                href="http://rhyshowell.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Rhys
              </a>
            </div>
          </div>
          <Divider />
          {/* TODO: On changing this, we should make sure the user is cool with changing their set up randomizer. */}
          {/* <SelectField
            className="convergent-js-svg-controls-algorithm"
            floatingLabelText="Randomize Algorithm"
            onChange={this.handleAlgorithmChange}
            selectedMenuItemStyle={{
              color: '#3498db'
            }}
            value={randomizeAlgorithm}
          >
            <MenuItem value={ALGORITHMS.FULL_RANDOM} primaryText="Random" />
          </SelectField> */}
          <ListItem
            primaryText="View Controls"
            initiallyOpen={true}
            primaryTogglesNestedList={true}
            nestedItems={this.renderLayoutControls()}
          />
          <ListItem
            primaryText="Randomizer Controls"
            initiallyOpen={false}
            primaryTogglesNestedList={true}
            nestedItems={this.renderRandomizationConfig()}
          />
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const layout = state.convergent.present;
  const randomizationConfig = state.convergent.present.randomizationConfig;

  const shapeOuterColor = {r: 250, g: 250, b: 250};

  return {
    primarySVGColor: createColorString(shapeOuterColor),
    contrastPrimarySVGColor: getContrastingBinaryColor(shapeOuterColor),
    layout,
    randomizeAlgorithm: state.convergent.randomizeAlgorithm,
    randomizationConfig,
    svgRef: state.convergent.svgRef
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     setRandomizeAlgorithm: newAlgorithm => dispatch(setRandomizeAlgorithm(newAlgorithm)),
//     updateVisual: change => dispatch(updateVisual(change))
//   };
// };

export default connect(
  mapStateToProps,
  null
)(SvgControls);
