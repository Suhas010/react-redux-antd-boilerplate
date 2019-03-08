/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Switch, Icon } from 'antd';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './TableWrapper.scss';

class TableWrapper extends Component {

  onGridReady = (params) => {
    this.params = params;
    this.api = params.api;
    this.columnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    // this.props.onGridReady && this.props.onGridReady(params, this.props.groupId);
  };

  onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  renderSwitch = ({ value }) => (
    <Switch
      disabled
      checked={value}
      checkedChildren={<Icon type="check" />}
      unCheckedChildren={<Icon type="close" />}
    />
  );

  renderViewLink = ({ value }) => <a onClick={() => this.props.handleViewQuestionClick(value)} >View Questions</a>;

  renderEditLink = ({ value }) => <a onClick={() => this.props.handleTGEditClick(value)} ><Icon type="edit"/></a>;

  renderAgeRange = ({value, data }) => {
    return <span>{`${value} to ${data.maximum_age}`}</span>
  }

  renderGender = ({ value }) => <span>{value}</span>;
  
  renderData = ({ value }) => <span>{value.name || 'NA'}</span>;
  
  handleChange = ({ oldValue, newValue, colDef, data, node }) => {
    // console.log(oldValue, newValue);
  }

  handleEditClick = (id) => {
    this.openForm('Edit', id);
  }

  handleViewClick = (id) => {
    this.openForm('View', id);
  }

  openForm = (mode, id) => {
    this.setState({
      isOpenForm: true,
      mode,
      id,
    });
  }

  handleClose = () => {
    this.setState({
      isOpenForm: false,
      mode: '',
      id: '',
    });
  }

  render = () => {
    const { data, headers } = this.props;
    return (
      <div className="table-container">
        <div className="ag-theme-balham table-layout">
          <AgGridReact
            enableCellChangeFlash
            refreshCells
            animateRows
            rowDragManaged
            colResizeDefault
            rowHeight={38}
            minHeight={300}
            headerHeight={40}
            domLayout="autoHeight"
            columnDefs={headers}
            rowData={data}
            onCellValueChanged={this.handleChange}
            pagination
            paginationPageSize={10}
            onGridReady={this.onGridReady}
            onFirstDataRendered={this.onFirstDataRendered}
            frameworkComponents={{
              renderSwitch: this.renderSwitch,
              renderViewLink: this.renderViewLink,
              renderEditLink: this.renderEditLink,
              renderGender: this.renderGender,
              renderData: this.renderData,
              renderAgeRange: this.renderAgeRange,
            }}
          />
        </div>
      </div>
    );
  }
}

export default TableWrapper;
