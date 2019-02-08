import React, { Component } from 'react';
import { Button, Dialog } from '@blueprintjs/core';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './TableWrapper.scss';
import QuestionForm from '../form/QuestionForm';

class TableWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenForm: false,
      mode: '',
      id: '',
    };
  }

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

  renderViewButton = ({ value, data }) => {
    console.log(data);
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <Button
            text="View"
            id={value}
            icon="zoom-in"
            intent="none"
            onClick={() => this.handleViewClick(data.id, 'View')}
          />
        </div>
        <div style={{ paddingLeft: '10px' }}>
          <Button
            text="Edit"
            id={value}
            icon="edit"
            intent="none"
            onClick={() => this.handleEditClick(data.id, 'Edit')}
          />
        </div>
      </div>
    );
  }

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

  getForm = () => {
    const { isOpenForm, mode, id } = this.state;
    // console.log(isOpenForm, mode, id);
    if (isOpenForm) {
      return (
        <QuestionForm
          mode={mode}
          id={id}
          handleClose={this.handleClose}
        />
      );
    }
  }

  render = () => {
    const { data, headers } = this.props;
    return (
      <div className="table-container">
        {this.getForm()}
        <div className="ag-theme-balham table-layout">
          <AgGridReact
            enableCellChangeFlash
            refreshCells
            animateRows
            rowDragManaged
            enableSorting
            colResizeDefault
            rowHeight={38}
            minHeight={300}
            headerHeight={43}
            domLayout="autoHeight"
            columnDefs={headers}
            rowData={data}
            onCellValueChanged={this.handleChange}
            pagination
            paginationPageSize={10}
            onGridReady={this.onGridReady}
            onFirstDataRendered={this.onFirstDataRendered}
            frameworkComponents={{
              renderViewButton: this.renderViewButton,
            }}
          />
        </div>
      </div>
    );
  }
}

export default TableWrapper;
