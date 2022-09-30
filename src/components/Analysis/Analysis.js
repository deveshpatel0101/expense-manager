import React from 'react';
import './Analysis.css';

import { Select } from 'antd';
import ByMonth from '../Stats/ByMonth/ByMonth';
import ByYear from '../Stats/ByYear/ByYear';
import ByTagMonth from '../Stats/ByTagMonth/ByTagMonth';
import ByTagYear from '../Stats/ByTagYear/ByTagYear';

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
                        <Option value='tag-month'>Tag - Month</Option>
                        <Option value='tag-year'>Tag - Year</Option>
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

                {this.state.view === 'tag-month' && (
                    <div className='Analysis-Tag-Month-Graph'>
                        <ByTagMonth />
                    </div>
                )}

                {this.state.view === 'tag-year' && (
                    <div className='Analysis-Tag-Year-Graph'>
                        <ByTagYear />
                    </div>
                )}
            </div>
        );
    }
}

export default Analysis;
