import React from 'react';
import './Tag.css';

import { updateTag, deleteTag } from '../../controllers/tags';
import TagModal from '../TagModal/TagModal';

class Tag extends React.Component {
    state = {
        showModal: false,
    };

    handleModal = (visibility) => {
        this.setState({ showModal: visibility });
    };

    updateTag = async (data) => {
        await updateTag(data);
        this.props.refreshTags();
        this.setState({ showModal: false });
    };

    deleteTag = async () => {
        // eslint-disable-next-line no-restricted-globals
        const isConfirmed = confirm(
            "Action can't be undone! Are you sure you want to delete this tag? If there are transactions associated with it, action can't be performed."
        );
        if (!isConfirmed) {
            return;
        }
        await deleteTag({
            tagId: this.props.tag.tagId,
        });
        this.props.refreshTags();
        this.setState({ showModal: false });
    };

    render() {
        return (
            <div className='Tag-Container'>
                <div
                    className={`Tag-Content ${
                        this.props.tag.type === 'credit'
                            ? 'Tag-Credit'
                            : 'Tag-Debit'
                    }`}
                    onClick={() => {
                        this.handleModal(true);
                    }}
                >
                    {this.props.tag.name}
                </div>
                {this.state.showModal && (
                    <TagModal
                        tag={this.props.tag}
                        updateTag={this.updateTag}
                        deleteTag={this.deleteTag}
                        handleTagDiscard={() => this.handleModal(false)}
                        isNew={false}
                    />
                )}
            </div>
        );
    }
}

export default Tag;
