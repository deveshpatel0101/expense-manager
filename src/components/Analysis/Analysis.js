import React from 'react';
import './Analysis.css';

import { Select } from 'antd';
import ByMonth from '../Stats/ByMonth/ByMonth';

const { Option } = Select;

class Analysis extends React.Component {
    state = {
        view: 'month',
    };

    handleViewChange = (value) => {
        this.setState({
            view: value,
        });
    };

    render() {
        return (
            <div className='Analysis-Container'>
                <div className='Analysis-Selector'>
                    <Select
                        value={this.state.view}
                        onChange={this.props.handleViewChange}
                    >
                        <Option value='month'>Month</Option>
                        <Option value='year'>Year</Option>
                        <Option value='tag'>Tag</Option>
                    </Select>
                </div>
                <div className='Analysis-Graph'>
                    {this.state.view === 'month' && <ByMonth />}
                </div>
            </div>
        );
    }
}

export default Analysis;
