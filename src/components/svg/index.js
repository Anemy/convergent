import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  doneBuildingVisual,
  setSvgRef
} from '../../modules/convergent';

import './index.css';

class SVG extends Component {
  componentDidMount() {
    this.props.setSvgRef(this.svgRef);
  }

  componentDidUpdate() {
    if (this.props.isBuilding) {
      this.props.doneBuildingVisual();
    }
  }

  render() {
    const {
      backgroundColor,
      height,
      radialBackground,
      radialBackgroundColor,
      width
    } = this.props;
    
    return (
      <svg
        className="convergent-js-visual-container"
        height={height}
        ref={ref => { this.svgRef = ref; }}
        style={{
          background: radialBackground ?
            `radial-gradient(${radialBackgroundColor}, ${backgroundColor})` : backgroundColor
        }}
        width={width}
      />
    );
  }
};

const mapStateToProps = state => {
  const layout = state.convergent.present;

  return {
    backgroundColor: layout.backgroundColor,
    height: layout.height,
    isBuilding: state.convergent.isBuilding,
    radialBackground: layout.radialBackground,
    radialBackgroundColor: layout.radialBackgroundColor,
    shapes: layout.shapes,
    width: layout.width
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  doneBuildingVisual: () => doneBuildingVisual(),
  setSvgRef: ref => setSvgRef(ref)
}, dispatch);

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SVG);
