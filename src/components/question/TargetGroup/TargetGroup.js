import React, { Component } from 'react';
import { Table, Divider, Button } from 'antd';
import JSwitch from '../../reusable/Switch';

class TargetGroup extends Component {
  render() {    
    const columns = [
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'name',
      },
      {
        title: 'Min Age',
        dataIndex: 'minAge',
        key: 'min-age',
      },
      {
        title: 'Max Age',
        dataIndex: 'maxAge',
        key: 'max-age',
      },
      {
        title: 'Region',
        dataIndex: 'region',
        key: 'region',
        render: region => <JSwitch checked={region} disabled />,
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
      },
      {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
      },
      {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: 'Tier',
        dataIndex: 'tire',
        key: 'tire',
      },
      {
        title: 'Action',
        dataIndex: 'id',
        key: 'Action',
        render: id => (
          <>
            <a onClick={() => this.props.handleTGEditClick(id)} >Edit</a>
            <Divider type="vertical"/>
            <a onClick={() => this.props.handleViewQuestionClick(id)} >View Questions</a>
        </>),
      },
    ];
    return (
      <>
        <div className="target-group-header">Target Groups</div>
        <div className="add-button"><Button icon="plus" onClick={this.props.handleAddTGButtonClick} /> </div>
        <Table columns={columns} dataSource={this.props.data} />
      </>
    );
  }
}

export default TargetGroup;
