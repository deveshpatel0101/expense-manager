import React from 'react';
import './Navigation.css';
import { connect } from 'react-redux';
import { Button, Select } from 'antd';

import { updatePage, updatePerPage } from '../../redux/actions/pagination';
import { setTransactions } from '../../redux/actions/transactions';
import { getTransactions } from '../../controllers/transactions';

const { Option } = Select;

class Navigation extends React.Component {
    handlePrev = async () => {
        const { page, perPage } = this.props.pagination;
        if (page === 1) {
            return;
        }
        await this.loadTransactions(page - 1, perPage);
        this.props.dispatch(updatePage({ page: page - 1 }));
    };

    handleNext = async () => {
        const { page, perPage } = this.props.pagination;
        await this.loadTransactions(page + 1, perPage);
        this.props.dispatch(updatePage({ page: page + 1 }));
    };

    loadTransactions = async (page, perPage) => {
        const response = await getTransactions(
            page,
            perPage,
            this.props.filters
        );
        this.props.dispatch(setTransactions(response.transactions));
    };

    handlePerPageChange = async (e) => {
        const temp = e;
        this.props.dispatch(updatePerPage({ perPage: temp }));
        this.props.dispatch(updatePage({ page: 1 }));
        await this.loadTransactions(1, temp);
    };

    render() {
        return (
            <div className='Navigation-Container'>
                <div >
                    <Select
                        onChange={this.handlePerPageChange}
                        value={this.props.pagination.perPage}
                        className='Navigation-Select-Per-Page'
                    >
                        <Option value='10'>10</Option>
                        <Option value='20'>20</Option>
                        <Option value='40'>40</Option>
                        <Option value='60'>60</Option>
                        <Option value='80'>80</Option>
                        <Option value='100'>100</Option>
                    </Select>
                </div>
                <div className='Navigation-Buttons'>
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
                            Number(this.props.pagination.perPage)
                        }
                    >
                        Next
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions,
        tags: state.tags,
        pagination: state.pagination,
        filters: state.filters,
    };
};

export default connect(mapStateToProps)(Navigation);
