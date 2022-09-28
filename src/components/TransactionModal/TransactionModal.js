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
        date: this.props.transaction?.date || moment.utc().format(),
        transactionId: this.props.transaction?.transactionId || null,
        saveLoading: false,
        deleteLoading: false,
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

    handleTransactionSave = async () => {
        this.setState({ saveLoading: true });
        if (this.props.isNew) {
            const data = { ...this.state };
            delete data.saveLoading;
            delete data.deleteLoading;
            await this.props.addTransaction(data);
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
            await this.props.updateTransaction(data);
        }
        if (this._isMounted) {
            this.setState({ saveLoading: false });
        }
    };

    handleDeleteTransaction = async () => {
        this.setState({ deleteLoading: true });
        await this.props.deleteTransaction();
        if(this._isMounted) {
            this.setState({deleteLoading: false})
        }
    };

    handleTransactionDiscard = () => {
        const { saveLoading, deleteLoading } = this.state;
        if (!saveLoading && !deleteLoading) {
            this.props.transactionDiscard();
        }
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { amount, note, tagId, date, saveLoading, deleteLoading } =
            this.state;
        let isDisabled = amount < 0 || note?.length <= 0 || !tagId || !date;
        let footer = [
            <Button
                key='save'
                type='primary'
                onClick={this.handleTransactionSave}
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
                    onClick={this.handleDeleteTransaction}
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
                title='Transaction'
                visible={true}
                className='Transaction-Modal-Container'
                closable={!saveLoading && !deleteLoading}
                maskClosable={!saveLoading && !deleteLoading}
                footer={footer}
                onCancel={this.handleTransactionDiscard}
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
