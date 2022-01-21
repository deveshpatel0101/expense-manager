import React from 'react';
import './Filters.css';
import { connect } from 'react-redux';
import { DatePicker, Select, InputNumber, Button } from 'antd';

const { RangePicker } = DatePicker;
const { Option } = Select;

class Filters extends React.Component {
  state = {
    dateFilterOption: 'one-month',
    tag: null,
    type: null,
    minAmount: null,
    maxAmount: null,
  };

  handleDateOptionChange = (e) => {
    this.setState({ dateFilterOption: e });
  };

  handleTagChange = (e) => {
    this.setState({ tag: e === 'select' ? null : e });
  };

  handleTypeChange = (e) => {
    this.setState({ type: e === 'select' ? null : e });
  };

  render() {
    const { dateFilterOption, tag, type, minAmount, maxAmount } = this.state;
    return (
      <div className='Filters-Container'>
        <div className='Date-Filter-Options'>
          <Select
            showSearch
            placeholder='Date Range'
            onChange={this.handleDateOptionChange}
            style={{ width: '100%' }}
            value={dateFilterOption}
          >
            <Option value='today'>Today</Option>
            <Option value='one-month'>Past One Month</Option>
            <Option value='size-month'>Past Six Month</Option>
            <Option value='all-time'>All time</Option>
            <Option value='custom'>Custom</Option>
          </Select>
        </div>
        {dateFilterOption === 'custom' && (
          <div className='Date-Picker'>
            <div className='Date-Picker-First'>
              <DatePicker
                placeholder='Start'
                onChange={this.handleStartDateChange}
                style={{ width: '49%' }}
              />
            </div>
            <div className='Date-Picker-Second'>
              <DatePicker
                placeholder='End'
                onChange={this.handleStartDateChange}
                style={{ width: '49%' }}
              />
            </div>
          </div>
        )}
        <div className='Tag-Filter'>
          <Select
            showSearch
            placeholder='Tag'
            onChange={this.handleTagChange}
            style={{ width: '100%' }}
            value={tag}
          >
            <Option value='select'>Select</Option>
            {this.props.tags.map((item, index) => (
              <Option key={index} value={item.tagId}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
        <div className='Type-Filter'>
          <Select
            showSearch
            placeholder='Type'
            onChange={this.handleTypeChange}
            style={{ width: '100%' }}
            value={type}
          >
            <Option value='select'>Select</Option>
            <Option value='credit'>Credit</Option>
            <Option value='Debit'>Debit</Option>
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
              style={{ width: '98%' }}
            />
          </div>
          <div className='Amount-Second-Value'>
            <InputNumber
              min={0}
              max={Number.MAX_SAFE_INTEGER}
              style={{ width: '98%' }}
              value={maxAmount}
              placeholder='Max Amount'
              onChange={(e) => this.setState({ maxAmount: e })}
            />
          </div>
        </div>
        <div className='Filter-Button'>
          <Button type='primary'>Filter</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.tags,
  };
};

export default connect(mapStateToProps)(Filters);
