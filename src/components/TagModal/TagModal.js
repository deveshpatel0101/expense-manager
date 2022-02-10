import React from 'react';
import './TagModal.css';
import { Modal, Button, Input, Select } from 'antd';

const { Option } = Select;

class TagModal extends React.Component {
    state = {
        name: this.props.tag?.name || '',
        type: this.props.tag?.type || 'select',
    };

    handleNameChange = (e) => {
        this.setState({ name: e.target.value });
    };

    handleTypeChange = (e) => {
        this.setState({ type: e });
    };

    handleTagSave = () => {
        if (this.props.isNew) {
            this.props.addTag({ ...this.state });
        } else {
            this.props.updateTag({
                tagId: this.props.tag.tagId,
                fields: { ...this.state },
            });
        }
    };

    render() {
        const { name, type } = this.state;
        let isDisabled =
            name?.length <= 0 || (type !== 'credit' && type !== 'debit');
        let footer = [
            <Button
                key='save'
                type='primary'
                onClick={this.handleTagSave}
                disabled={isDisabled}
            >
                Save
            </Button>,
        ];
        if (!this.props.isNew) {
            footer.unshift(
                <Button key='delete' onClick={this.props.deleteTag} danger>
                    Delete
                </Button>
            );
        }

        return (
            <Modal
                title='Tag'
                visible={true}
                className='Tag-Modal-Container'
                closable={true}
                maskClosable={true}
                footer={footer}
                onCancel={this.props.handleTagDiscard}
            >
                <div className='Tag-Modal-Name'>
                    <Input
                        name='name'
                        placeholder='Name'
                        value={name}
                        onChange={this.handleNameChange}
                    />
                </div>

                <div className='Tag-Modal-Type'>
                    <Select value={type} onChange={this.handleTypeChange}>
                        <Option value='select'>Select</Option>
                        <Option value='credit'>Credit</Option>
                        <Option value='debit'>Debit</Option>
                    </Select>
                </div>
            </Modal>
        );
    }
}

export default TagModal;
