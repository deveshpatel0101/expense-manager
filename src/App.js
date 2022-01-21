import React from 'react';
import './App.css';

import ExpenseManager from './components/ExpenseManager/ExpenseManager';

class App extends React.Component {
    render() {
        return (
            <div className='Expense-Manager-Container'>
                <ExpenseManager />
            </div>
        );
    }
}

export default App;
