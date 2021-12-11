import React from 'react';
import './ExpenseManager.css';
import { connect } from 'react-redux';

import Transactions from '../Transactions/Transactions';
import { getTransactions } from '../../controllers/getTransactions';
import { addTransactions } from '../../redux/actions/transactions';
import Filters from '../Filters/Filters';

class ExpenseManager extends React.Component {
  componentDidMount() {
    getTransactions(this.props.keys).then((transactions) => {
      this.props.dispatch(addTransactions(transactions));
    });
  }

  render() {
    return (
      <div className='EM-Container'>
        <Filters />
        <Transactions />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    keys: state.keys,
  };
};

export default connect(mapStateToProps)(ExpenseManager);
