import React from 'react';
import './AddTransaction.css';
import { connect } from 'react-redux';
import { Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import TransactionModal from '../TransactionModal/TransactionModal';

import {
    addTransaction,
    getTransactions,
} from '../../controllers/transactions';
import { setTransactions } from '../../redux/actions/transactions';

class AddTransaction extends React.Component {
    state = {
        showModal: false,
    };

    handleModal = (visibility) => {
        this.setState({ showModal: visibility });
    };

    addTransaction = async (data) => {
        await addTransaction(data);
        await this.refreshTransactions();
    };

    getTransactions = async (page, perPage) => {
        let response = await getTransactions(page, perPage);
        this.props.dispatch(setTransactions(response.transactions));
    };

    refreshTransactions = async () => {
        const { page, perPage } = this.props.pagination;
        await this.getTransactions(page, perPage);
        this.setState({ showModal: false });
    };

    render() {
        return (
            <div className='Add-Transaction-Container'>
                <Tooltip title='Add Transaction'>
                    <Button
                        type='primary'
                        shape='circle'
                        icon={<PlusOutlined />}
                        size='large'
                        onClick={() => this.handleModal(true)}
                    />
                </Tooltip>
                {this.state.showModal && (
                    <TransactionModal
                        tags={this.props.tags}
                        isNew={true}
                        addTransaction={this.addTransaction}
                        handleTransactionDiscard={() => this.handleModal(false)}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        pagination: state.pagination,
        tags: state.tags,
    };
};

export default connect(mapStateToProps)(AddTransaction);
