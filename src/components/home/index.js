import React from 'react';
import { connect } from 'react-redux';

import './index.css';

import Controls from '../controls';
import Loader from '../loader';
import SVG from '../svg';

const Home = props => {
  return (
    <div className="concentric-js-home">
      <div
        className="concentric-js-home-background"
      />
      <SVG />
      {props.isBuilding && <Loader />}
      <Controls />
    </div>
  );
};

const mapStateToProps = state => ({
  isBuilding: state.canvas.isBuilding
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Home);
