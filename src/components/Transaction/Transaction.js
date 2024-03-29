import React from 'react';
import './Transaction.css';

import TransactionModal from '../TransactionModal/TransactionModal';
import {
    updateTransaction,
    deleteTransaction,
} from '../../controllers/transactions';
import moment from 'moment';

class Transaction extends React.Component {
    state = {
        showModal: false,
    };

    handleModal = (visibility) => {
        this.setState({ showModal: visibility });
    };

    updateTransaction = async (data) => {
        await updateTransaction(data);
        this.props.refreshTransactions();
        this.setState({ showModal: false });
    };

    deleteTransaction = async () => {
        // eslint-disable-next-line no-restricted-globals
        const isConfirmed = confirm(
            "Are you sure you want to delete this transaction? Action can't be undone!"
        );
        if (!isConfirmed) {
            return;
        }
        const response = await deleteTransaction({
            transactionId: this.props.transaction.transactionId,
        });
        if (!response.error) {
            this.props.refreshTransactions();
            this.setState({ showModal: false });
        } else {
            alert(response.errorMessage);
        }
    };

    render() {
        return (
            <div
                className={`Transaction-Container ${
                    this.props.transaction.tag.type === 'debit'
                        ? 'Transaction-Debit'
                        : 'Transaction-Credit'
                }`}
            >
                <div
                    className='Transaction'
                    onClick={() => this.handleModal(true)}
                >
                    <div className='Transaction-Tag-Date'>
                        <div className='Transaction-Tag'>
                            {this.props.transaction.tag.name}
                        </div>
                        <div className='Transaction-Date'>
                            {moment(this.props.transaction.date)
                                .local()
                                .format('Do MMM YYYY')}
                        </div>
                    </div>
                    <div className='Transaction-Note-Amount'>
                        <div className='Transaction-Note'>
                            {this.props.transaction.note}
                        </div>
                        <div className='Transaction-Amount'>
                            {this.props.transaction.tag.type === 'debit' && '-'}
                            $
                            {this.props.transaction.amount
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </div>
                    </div>
                </div>
                {this.state.showModal && (
                    <TransactionModal
                        transaction={this.props.transaction}
                        tags={this.props.tags}
                        updateTransaction={this.updateTransaction}
                        deleteTransaction={this.deleteTransaction}
                        transactionDiscard={() => this.handleModal(false)}
                        isNew={false}
                    />
                )}
            </div>
        );
    }
}

export default Transaction;
