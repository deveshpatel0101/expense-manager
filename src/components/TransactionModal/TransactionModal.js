import React from 'react';
import './TransactionModal.css';
import { Modal, Button, Input, Select, DatePicker } from 'antd';
import moment from 'moment';

const { Option } = Select;

class TransactionModal extends React.Component {
    state = {
        amount: this.props.transaction?.amount || null,
        note: this.props.transaction?.note || null,
        tagId: this.props.transaction?.tag.tagId || null,
        date: this.props.transaction?.date || null,
        transactionId: this.props.transaction?.transactionId || null,
    };

    handleAmountChange = (e) => {
        const temp = e.target.value;
        this.setState({ amount: temp });
    };

    handleNoteChange = (e) => {
        const temp = e.target.value;
        this.setState({ note: temp });
    };

    handleTagChange = (e) => {
        this.setState({ tagId: e === 'select' ? null : e });
    };

    handleDateChange = (e) => {
        this.setState({ date: e && e.utc().format() });
    };

    handleTransactionSave = () => {
        if (this.props.isNew) {
            const data = { ...this.state };
            this.props.addTransaction(data);
        } else {
            const { amount, date, note, tagId, transactionId } = this.state;
            const data = {
                transactionId,
                fields: {
                    amount,
                    date: moment.utc(date).format(),
                    note,
                    tagId,
                },
            };
            this.props.updateTransaction(data);
        }
    };

    render() {
        const { amount, note, tagId, date } = this.state;
        let isDisabled = amount < 0 || note?.length <= 0 || !tagId || !date;
        let footer = [
            <Button key='discard' onClick={this.props.handleTransactionDiscard}>
                Discard
            </Button>,
            <Button
                key='save'
                type='primary'
                onClick={this.handleTransactionSave}
                disabled={isDisabled}
            >
                Save
            </Button>,
        ];
        if (!this.props.isNew) {
            footer.unshift(
                <Button
                    key='delete'
                    onClick={this.props.deleteTransaction}
                    danger
                >
                    Delete
                </Button>
            );
        }
        return (
            <Modal
                title='Transaction'
                visible={true}
                className='Transaction-Modal-Container'
                closable={true}
                maskClosable={true}
                footer={footer}
                onCancel={this.props.handleTransactionDiscard}
            >
                <div className='Modal-Transaction-Amount'>
                    <Input
                        name='amount'
                        placeholder='Amount'
                        type={'number'}
                        value={this.state.amount}
                        onChange={this.handleAmountChange}
                    />
                </div>

                <div className='Modal-Transaction-Note'>
                    <Input
                        name='note'
                        placeholder='Note'
                        value={this.state.note}
                        onChange={this.handleNoteChange}
                    />
                </div>

                <div className='Modal-Transaction-Tag'>
                    <Select
                        style={{ width: '100%' }}
                        placeholder='Tag'
                        onChange={this.handleTagChange}
                        value={tagId}
                    >
                        <Option value='select'>Select</Option>
                        {this.props.tags.map((tag) => (
                            <Option key={tag.tagId} value={tag.tagId}>
                                {tag.name}
                            </Option>
                        ))}
                    </Select>
                </div>

                <div className='Modal-Transaction-Date'>
                    <DatePicker
                        onChange={this.handleDateChange}
                        value={date ? moment.utc(date).local() : ''}
                        format='MM-DD-YYYY'
                    />
                </div>
            </Modal>
        );
    }
}

export default TransactionModal;
