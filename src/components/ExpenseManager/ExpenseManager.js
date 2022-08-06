import React from 'react';
import './ExpenseManager.css';

import Transactions from '../Transactions/Transactions';
import Filters from '../Filters/Filters';
import Navigation from '../Navigation/Navigation';
import AddTransaction from '../AddTransaction/AddTransaction';
import ViewSwitcher from '../ViewSwitcher/ViewSwitcher';
import Tags from '../Tags/Tags';
import AddTag from '../AddTag/AddTag';
import Analysis from '../Analysis/Analysis';

class ExpenseManager extends React.Component {
    state = {
        view: 'analysis',
    };

    handleChange = (e) => {
        this.setState({ view: e });
    };

    render() {
        return (
            <div className='EM-Container'>
                <ViewSwitcher
                    handleViewChange={this.handleChange}
                    view={this.state.view}
                />
                {this.state.view === 'transactions' && (
                    <React.Fragment>
                        <Filters />
                        <Transactions />
                        <Navigation />
                        <AddTransaction />
                    </React.Fragment>
                )}
                {this.state.view === 'tags' && (
                    <React.Fragment>
                        <Tags />
                        <AddTag />
                    </React.Fragment>
                )}
                {this.state.view === 'analysis' && (
                    <React.Fragment>
                        <Analysis />
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default ExpenseManager;
