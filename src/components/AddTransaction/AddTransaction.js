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
        const response = await addTransaction(data);
        if (!response.error) {
            await this.refreshTransactions();
        } else {
            alert(response.errorMessage);
        }
    };

    refreshTransactions = async () => {
        const { page, perPage } = this.props.pagination;
        let response = await getTransactions(page, perPage, this.props.filters);
        this.props.dispatch(setTransactions(response.transactions));
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
                        transactionDiscard={() => this.handleModal(false)}
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
        filters: state.filters,
    };
};

export default connect(mapStateToProps)(AddTransaction);
