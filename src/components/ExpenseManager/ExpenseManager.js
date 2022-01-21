import React from 'react';
import './ExpenseManager.css';

import Transactions from '../Transactions/Transactions';
import Filters from '../Filters/Filters';
import Navigation from '../Navigation/Navigation';
import AddTransaction from '../AddTransaction/AddTransaction';

class ExpenseManager extends React.Component {
  render() {
    return (
      <div className='EM-Container'>
        <Filters />
        <Transactions />
        <Navigation />
        <AddTransaction />
      </div>
    );
  }
}

export default ExpenseManager;
