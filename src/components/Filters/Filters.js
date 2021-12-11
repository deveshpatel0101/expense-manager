import React from 'react';
import './Filters.css';
import { connect } from 'react-redux';

class Filters extends React.Component {
  render() {
    return <div className='Filters-Container'>Filters</div>;
  }
}

const mapStateToProps = (_) => {
  return {};
};

export default connect(mapStateToProps)(Filters);
