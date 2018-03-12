import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import Path from '../../path';

class Shape extends Component {
  render() {
    console.log('Render shape w/ layout', this.props.layout);

    return <div />;
  }
};

const mapStateToProps = (state, ownProps) => {
  const layout = state.convergent.present;

  return {
    layout
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Shape);
