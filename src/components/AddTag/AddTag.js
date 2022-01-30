import React from 'react';
import './AddTag.css';
import { connect } from 'react-redux';
import { Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import TagModal from '../TagModal/TagModal';

import { addTag, getTags } from '../../controllers/tags';
import { setTags } from '../../redux/actions/tags';

class AddTag extends React.Component {
    state = {
        showModal: false,
    };

    handleModal = (visibility) => {
        this.setState({ showModal: visibility });
    };

    addTag = async (data) => {
        await addTag(data);
        await this.refreshTags();
    };

    getTags = async (page, perPage) => {
        let response = await getTags(page, perPage);
        this.props.dispatch(setTags(response.tags));
    };

    refreshTags = async () => {
        await this.getTags(1, 100);
        this.setState({ showModal: false });
    };

    render() {
        return (
            <div className='Add-Tag-Container'>
                <Tooltip title='Add Tag'>
                    <Button
                        type='primary'
                        shape='circle'
                        icon={<PlusOutlined />}
                        size='large'
                        onClick={() => this.handleModal(true)}
                    />
                </Tooltip>
                {this.state.showModal && (
                    <TagModal
                        tags={this.props.tags}
                        isNew={true}
                        addTag={this.addTag}
                        handleTagDiscard={() => this.handleModal(false)}
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

export default connect(mapStateToProps)(AddTag);
