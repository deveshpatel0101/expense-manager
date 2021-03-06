import React from 'react';
import './Filters.css';
import { connect } from 'react-redux';
import { DatePicker, Select, InputNumber, Button, Input } from 'antd';
import moment from 'moment';

import { getTransactions } from '../../controllers/transactions';
import { setTransactions } from '../../redux/actions/transactions';
import { updatePage } from '../../redux/actions/pagination';
import { updateFilters } from '../../redux/actions/filters';

const { Option } = Select;

const getDefaultFilters = () => {
    return {
        dateFilterOption: 'six-months',
        tagId: null,
        minAmount: null,
        maxAmount: null,
        text: null,
        fromDate: moment
            .utc(moment().subtract(5, 'months').startOf('month'))
            .format(),
        toDate: moment.utc(moment().endOf('month')).format(),
    };
};

class Filters extends React.Component {
    state = this.props.filters;

    handleDateOptionChange = (e) => {
        if (e === 'custom') {
            this.setState({
                dateFilterOption: e,
                fromDate: null,
                toDate: null,
            });
            return;
        }

        let fromDate = '';
        let toDate = '';
        if (e === 'one-month') {
            fromDate = moment.utc(moment().startOf('month')).format();
            toDate = moment.utc(moment().endOf('month')).format();
        } else if (e === 'six-months') {
            fromDate = moment
                .utc(moment().subtract(5, 'months').startOf('month'))
                .format();
            toDate = moment.utc(moment().endOf('month')).format();
        } else if (e === 'today') {
            fromDate = moment.utc(moment().startOf('day')).format();
            toDate = moment.utc(moment().endOf('day')).format();
        } else if (e === 'all-time') {
            fromDate = null;
            toDate = null;
        }
        this.setState({ fromDate, toDate, dateFilterOption: e });
    };

    handleTagChange = (e) => {
        this.setState({ tagId: e === 'select' ? null : e });
    };

    handleFromDateChange = (e) => {
        const fromDate = moment.utc(e.startOf('day')).format();
        this.setState({ fromDate });
    };

    handleToDateChange = (e) => {
        const toDate = moment.utc(e.endOf('day')).format();
        this.setState({ toDate });
    };

    handleTextChange = (e) => {
        let text = e.target.value;
        text = text || null;
        this.setState({ text });
    };

    handleFilter = async () => {
        const { tagId, fromDate, toDate, minAmount, maxAmount, text } =
            this.state;
        const query = { tagId, fromDate, toDate, minAmount, maxAmount, text };

        const perPage = this.props.pagination.perPage;
        const response = await getTransactions(1, perPage, query);

        this.props.dispatch(updateFilters({ ...this.state }));
        this.props.dispatch(setTransactions(response.transactions));
        this.props.dispatch(updatePage({ page: 1 }));
    };

    handleResetFilters = async () => {
        const defaultFilters = getDefaultFilters();
        this.setState(defaultFilters);

        const perPage = this.props.pagination.perPage;
        const response = await getTransactions(1, perPage, defaultFilters);

        this.props.dispatch(updateFilters({ ...defaultFilters }));
        this.props.dispatch(setTransactions(response.transactions));
        this.props.dispatch(updatePage({ page: 1 }));
    };

    render() {
        const {
            dateFilterOption,
            fromDate,
            toDate,
            tagId,
            minAmount,
            maxAmount,
            text,
        } = this.state;
        return (
            <div className='Filters-Container'>
                <div className='Date-Filter-Options'>
                    <Select
                        placeholder='Date Range'
                        onChange={this.handleDateOptionChange}
                        style={{ width: '100%' }}
                        value={dateFilterOption}
                    >
                        <Option value='today'>Today</Option>
                        <Option value='one-month'>This Month</Option>
                        <Option value='six-months'>Past Six Month</Option>
                        <Option value='all-time'>All time</Option>
                        <Option value='custom'>Custom</Option>
                    </Select>
                </div>

                {dateFilterOption === 'custom' && (
                    <div className='Date-Picker'>
                        <div className='Date-Picker-First'>
                            <DatePicker
                                placeholder='Start'
                                onChange={this.handleFromDateChange}
                                style={{ width: '99%' }}
                                value={
                                    fromDate ? moment.utc(fromDate).local() : ''
                                }
                                format='MM-DD-YYYY'
                            />
                        </div>
                        <div className='Date-Picker-Second'>
                            <DatePicker
                                placeholder='End'
                                onChange={this.handleToDateChange}
                                style={{ width: '99%' }}
                                value={toDate ? moment.utc(toDate).local() : ''}
                                format='MM-DD-YYYY'
                            />
                        </div>
                    </div>
                )}

                <div className='Tag-Filter'>
                    <Select
                        placeholder='Tag'
                        onChange={this.handleTagChange}
                        style={{ width: '100%' }}
                        value={tagId}
                    >
                        <Option value='select'>Select</Option>
                        {this.props.tags.map((item, index) => (
                            <Option key={index} value={item.tagId}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </div>

                <div className='Amount-Filter'>
                    <div className='Amount-First-Value'>
                        <InputNumber
                            min={0}
                            max={Number.MAX_SAFE_INTEGER}
                            value={minAmount}
                            placeholder='Min Amount'
                            onChange={(e) => this.setState({ minAmount: e })}
                            style={{ width: '99%' }}
                            type={'number'}
                        />
                    </div>
                    <div className='Amount-Second-Value'>
                        <InputNumber
                            min={0}
                            max={Number.MAX_SAFE_INTEGER}
                            style={{ width: '99%' }}
                            value={maxAmount}
                            placeholder='Max Amount'
                            onChange={(e) => this.setState({ maxAmount: e })}
                            type={'number'}
                        />
                    </div>
                </div>

                <div className='Text-Filter'>
                    <Input
                        placeholder='Text'
                        onChange={this.handleTextChange}
                        value={text}
                    />
                </div>

                <div className='Filter-Button'>
                    <Button
                        type='primary'
                        ghost
                        onClick={this.handleResetFilters}
                    >
                        Reset Filters
                    </Button>
                    <Button type='primary' onClick={this.handleFilter}>
                        Filter
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tags: state.tags,
        pagination: state.pagination,
        filters: state.filters,
    };
};

export default connect(mapStateToProps)(Filters);
