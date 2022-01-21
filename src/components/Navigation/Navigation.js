import React from 'react';
import './Navigation.css';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { updatePagination } from '../../redux/actions/pagination';
import { setTransactions } from '../../redux/actions/transactions';
import { getTransactions } from '../../controllers/transactions';

class Navigation extends React.Component {
    handlePrev = async (e) => {
        const { page, perPage } = this.props.pagination;
        if (page === 1) {
            return;
        }
        await this.loadTransactions(page - 1, perPage);
        this.props.dispatch(updatePagination({ page: page - 1 }));
    };

    handleNext = async (e) => {
        const { page, perPage } = this.props.pagination;
        await this.loadTransactions(page + 1, perPage);
        this.props.dispatch(updatePagination({ page: page + 1 }));
    };

    loadTransactions = async (page, perPage) => {
        const response = await getTransactions(page, perPage);
        this.props.dispatch(setTransactions(response.transactions));
    };

    render() {
        return (
            <div className='Nav-Buttons'>
                <Button
                    type='primary'
                    disabled={this.props.pagination.page === 1}
                    onClick={this.handlePrev}
                >
                    Previous
                </Button>
                <Button
                    type='primary'
                    onClick={this.handleNext}
                    disabled={
                        this.props.transactions.length <
                        this.props.pagination.perPage
                    }
                >
                    Next
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions,
        tags: state.tags,
        pagination: state.pagination,
    };
};

export default connect(mapStateToProps)(Navigation);
