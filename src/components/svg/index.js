import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  doneBuildingVisual,
  setSvgRef
} from '../../modules/convergent';

import './index.css';

import Shape from './shape';

class SVG extends Component {
  componentDidMount() {
    this.props.setSvgRef(this.svgRef);
  }

  componentDidUpdate() {
    if (this.props.isBuilding) {
      this.props.doneBuildingVisual();
    }
  }

  renderShapes() {
    const {
      shapes
    } = this.props;

    const renderedShapes = [];

    _.each(shapes, (shape, index) => {
      renderedShapes.push(
        <Shape
          id={index}
          key={index}
        />
      );
    });

    return renderedShapes;
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
        className="concentric-js-visual-container"
        height={height}
        ref={ref => { this.svgRef = ref; }}
        style={{
          background: radialBackground ?
            `radial-gradient(${radialBackgroundColor}, ${backgroundColor})` : backgroundColor
        }}
        width={width}
      >
        {this.renderShapes()}
      </svg>
    );
  }
};

const mapStateToProps = state => {
  const layout = state.canvas.present;

  return {
    backgroundColor: layout.backgroundColor,
    height: layout.height,
    isBuilding: state.canvas.isBuilding,
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