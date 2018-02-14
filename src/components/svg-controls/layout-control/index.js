// import Divider from 'material-ui/Divider';
import { ListItem } from 'material-ui/List'; // List
// import MenuItem from 'material-ui/MenuItem';
// import Subheader from 'material-ui/Subheader';
// import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import React, { Component } from 'react';
// import { CompactPicker } from 'react-color';
import { connect } from 'react-redux';

import {
  updateLayout
} from '../../../modules/convergent';

class Control extends Component {
  toggleSetting = (event, index, value) => {
    this.props.updateLayout(value);
  }

  render() {
    console.log('Render layout control', this.props);

    return (
      <div>  
        <ListItem
          primaryText="SomeToggle"
          rightToggle={<Toggle
            onToggle={this.toggleSetting}
            // toggled={radialBackground}
          />}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const {
    settingIndex
  } = props;

  const layout = state.convergent.present;

  // let layoutSetting;
  // if (_.isArray(settingIndex)) {
  //   for (let i = 0; i < settingIndex.length; i++) {
  //     layoutSetting = 
  //   }
  // } else {
    const layoutSetting = layout[settingIndex];
  // }

  return {
    layoutSetting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLayout: newLayoutSetting => dispatch(updateLayout(newLayoutSetting))
  };
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Control);
