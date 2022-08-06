import React from 'react';
import './Analysis.css';

import { Select } from 'antd';
import ByMonth from '../Stats/ByMonth/ByMonth';
import ByYear from '../Stats/ByYear/ByYear';

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
                        onChange={this.handleViewChange}
                    >
                        <Option value='month'>Month</Option>
                        <Option value='year'>Year</Option>
                        <Option value='tag'>Tag</Option>
                    </Select>
                </div>

                {this.state.view === 'month' && (
                    <div className='Analysis-Month-Graph'>
                        <ByMonth />
                    </div>
                )}

                {this.state.view === 'year' && (
                    <div className='Analysis-Year-Graph'>
                        <ByYear />
                    </div>
                )}
                {this.state.view === 'tag' && 'Coming soon...'}
            </div>
        );
    }
}

export default Analysis;
