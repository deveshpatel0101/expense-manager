import React from 'react';
import './Tags.css';
import { connect } from 'react-redux';

import Tag from '../Tag/Tag';
import { getTags } from '../../controllers/tags';
import { setTags } from '../../redux/actions/tags';

class Tags extends React.Component {
    async componentDidMount() {
        await this.refreshTags();
    }

    refreshTags = async () => {
        const response = await getTags(1, 100);
        this.props.dispatch(setTags(response.tags));
    };

    render() {
        return (
            <div className='Tags-Container'>
                {this.props.tags.map((tag) => (
                    <Tag
                        key={tag.tagId}
                        tag={tag}
                        refreshTags={this.refreshTags}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tags: state.tags,
    };
};

export default connect(mapStateToProps)(Tags);
