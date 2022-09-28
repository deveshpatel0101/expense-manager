import React from 'react';
import './TagModal.css';
import { Modal, Button, Input, Select } from 'antd';

const { Option } = Select;

class TagModal extends React.Component {
    state = {
        name: this.props.tag?.name || '',
        type: this.props.tag?.type || 'select',
        saveLoading: false,
        deleteLoading: false,
    };

    handleNameChange = (e) => {
        this.setState({ name: e.target.value });
    };

    handleTypeChange = (e) => {
        this.setState({ type: e });
    };

    handleTagSave = async () => {
        this.setState({ saveLoading: true });
        const { name, type } = this.state;
        if (this.props.isNew) {
            await this.props.addTag({ name, type });
        } else {
            await this.props.updateTag({
                tagId: this.props.tag.tagId,
                fields: { name, type },
            });
        }
        if (this._isMounted) {
            this.setState({ saveLoading: false });
        }
    };

    handleDeleteTag = async () => {
        this.setState({ deleteLoading: true });
        await this.props.deleteTag();
        if (this._isMounted) {
            this.setState({ deleteLoading: false });
        }
    };

    handleTagDiscard = () => {
        const { saveLoading, deleteLoading } = this.state;
        if (!saveLoading && !deleteLoading) {
            this.props.tagDiscard();
        }
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { name, type, saveLoading, deleteLoading } = this.state;
        let isDisabled =
            name?.length <= 0 || (type !== 'credit' && type !== 'debit');
        let footer = [
            <Button
                key='save'
                type='primary'
                onClick={this.handleTagSave}
                disabled={isDisabled || saveLoading || deleteLoading}
                loading={saveLoading}
            >
                Save
            </Button>,
        ];
        if (!this.props.isNew) {
            footer.unshift(
                <Button
                    key='delete'
                    onClick={this.handleDeleteTag}
                    danger
                    disabled={saveLoading || deleteLoading}
                    loading={deleteLoading}
                >
                    Delete
                </Button>
            );
        }

        return (
            <Modal
                title='Tag'
                visible={true}
                className='Tag-Modal-Container'
                closable={!saveLoading && !deleteLoading}
                maskClosable={!saveLoading && !deleteLoading}
                footer={footer}
                onCancel={this.handleTagDiscard}
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
