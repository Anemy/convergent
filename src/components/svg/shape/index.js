import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import Path from '../../path';

class Shape extends Component {
  render() {
    return <div />;
  }
};

const mapStateToProps = (state, ownProps) => {
  // const layout = state.convergent.present;

  return {
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Shape);
