import React from 'react';
import { connect } from 'react-redux';

import './index.css';

import Controls from '../controls';
import Loader from '../loader';
import SVG from '../svg';

const Home = props => {
  return (
    <div className="convergent-js-home">
      <div
        className="convergent-js-home-background"
      />
      <SVG />
      {props.isBuilding && <Loader />}
      <Controls />
    </div>
  );
};

const mapStateToProps = state => ({
  isBuilding: state.convergent.isBuilding
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Home);
