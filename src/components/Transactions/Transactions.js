import React from 'react';
import './Transactions.css';
import { connect } from 'react-redux';

class Transactions extends React.Component {
  render() {
    return (
      <div className='EM-Container'>
        Expense Manager {console.log(this.props.transactions)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    keys: state.keys,
    transactions: state.transactions,
  };
};

export default connect(mapStateToProps)(Transactions);
