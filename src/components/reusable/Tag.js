/* eslint-disable prefer-const */
/* eslint-disable object-curly-newline */
/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import { Tag, Icon, Input, Tooltip } from 'antd';

class JTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalTags: props.tags || [],
      selectedTags: props.selectedTags || [],
      addNewTag: false,
      newTagValue: '',
    };
  }

  showInput = () => {
    this.setState({
      addNewTag: true,
    }, () => this.input.focus());
  }

  handleAddNewTagChange = ({ target }) => {
    this.setState({
      newTagValue: target.value,
    });
  }

  handleAddNewTagConfirm = () => {
    let { newTagValue, totalTags, selectedTags } = this.state;
    if (newTagValue && totalTags.indexOf(newTagValue) === -1) {
      totalTags = [...totalTags, newTagValue];
      selectedTags = [...selectedTags, newTagValue];
    }
    this.props.onSelect(selectedTags);
    this.setState({
      totalTags,
      selectedTags,
      addNewTag: false,
      newTagValue: '',
    });
  }

  removeTag = (removedTag) => {
    const totalTags = this.state.totalTags.filter(tag => tag !== removedTag);
    const selectedTags = this.state.selectedTags.filter(tag => tag !== removedTag);
    // console.log("totalTags", totalTags, "selectedtags", selectedTags);
    this.props.onSelect(selectedTags);
    this.setState({
      totalTags,
      selectedTags,
    }, this.forceUpdate());
  }

  saveInputRef = input => this.input = input;

  selectTag = (tag, checked) => {
    const { selectedTags } = this.state;
    const nextselectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag);
    this.props.onSelect(nextselectedTags);
    // console.log('You are interested in: ', nextselectedTags);
    this.setState({ selectedTags: nextselectedTags });
  }


  render() {
    const { totalTags, selectedTags, addNewTag, newTagValue } = this.state;
    return (
      <div>
        {totalTags.map((tag) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <span className="tag">
              <Tag.CheckableTag
                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={checked => this.selectTag(tag, checked)}
                // style={{ backgroundColor: '#00bcd470', borderColor: '#08a8d4' }}
              >
                <Tag
                  key={tag}
                  closable
                  afterClose={() => this.removeTag(tag)}
                  style={{ border: 'none', background: 'content-box' }}
                >
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </Tag>
              </Tag.CheckableTag>
            </span>
          );
          return isLongTag ? <Tooltip text={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {addNewTag && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 140 }}
            value={newTagValue}
            onChange={this.handleAddNewTagChange}
            onBlur={this.handleAddNewTagConfirm}
            onPressEnter={this.handleAddNewTagConfirm}
          />
        )}
        {!addNewTag && (
          <span className="tag">
            <Tag
              onClick={this.showInput}
              style={{ background: '#fff', borderStyle: 'dashed', width: '140px' }}
            >
              Add New Tag
              <Icon type="plus" />
            </Tag>
          </span>
        )}
      </div>
    );
  }
}

export default JTag;
