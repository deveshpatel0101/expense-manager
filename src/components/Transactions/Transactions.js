import React from 'react';
import './Transactions.css';
import { connect } from 'react-redux';

import Transaction from '../Transaction/Transaction';

import { getTransactions } from '../../controllers/transactions';
import { getTags } from '../../controllers/getTags';
import { setTransactions } from '../../redux/actions/transactions';
import { setTags } from '../../redux/actions/tags';

class Transactions extends React.Component {
    async componentDidMount() {
        const { page, perPage } = this.props.pagination;
        await this.getTransactions(page, perPage);
        await this.getTags();
    }

    getTransactions = async (page, perPage) => {
        let response = await getTransactions(page, perPage);
        this.props.dispatch(setTransactions(response.transactions));
    };

    getTags = async () => {
        const response = await getTags();
        this.props.dispatch(setTags(response.tags));
    };

    refreshTransactions = async () => {
        const { page, perPage } = this.props.pagination;
        await this.getTransactions(page, perPage);
    };

    render() {
        return (
            <div className='Transactions-Container'>
                {this.props.transactions.map((transaction) => {
                    return (
                        <Transaction
                            key={transaction.transactionId}
                            tags={this.props.tags}
                            transaction={transaction}
                            refreshTransactions={this.refreshTransactions}
                        />
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        pagination: state.pagination,
        transactions: state.transactions,
        tags: state.tags,
    };
};

export default connect(mapStateToProps)(Transactions);
