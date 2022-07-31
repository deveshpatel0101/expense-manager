import React from 'react';
import './ViewSwitcher.css';

import { Select } from 'antd';

const { Option } = Select;

class ViewSwitcher extends React.Component {
    render() {
        return (
            <div className='View-Switcher-Container'>
                <div className='View-Switcher-Header'>Select View Type</div>
                <div className='View-Switcher-Select'>
                    <Select
                        value={this.props.view}
                        onChange={this.props.handleViewChange}
                    >
                        <Option value='transactions'>Transactions</Option>
                        <Option value='tags'>Tags</Option>
                        <Option value='analysis'>Analysis</Option>
                    </Select>
                </div>
            </div>
        );
    }
}

export default ViewSwitcher;
