/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Switch, Icon, Popconfirm } from 'antd';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import styled from 'styled-components';
import './TableWrapper.scss';
import CategoriesModel from '../../models/AppModel/Categories';
import SubCategoriesModel from '../../models/AppModel/SubCategories';
import { showWarningNotification } from '../reusable/Notifications';

const Message = styled.div`
  width: 300px;
  font-size: 14px;
  font-weight: 500;
`;

const ConfirmMessage = styled.div`
  width: 100%;
  text-align: center;
  justify-content: center;
  display: flex;
  padding-top: 4%;
  font-weight: 700;
`;

const CategoryMessage = () => (
  <>
    <Message>
      Deleting category will also delete all the target groups which are created using this category.
    </Message>
    <ConfirmMessage>
      Are you sure?
    </ConfirmMessage>
  </>
);
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

  renderViewLink = ({ value }) => <a onClick={() => this.props.handleViewClick(value)}>View Questions</a>;

  renderViewSubcategories = ({ value }) => <a onClick={() => this.props.handleViewClick(value)}>View Sub-Categories</a>;

  renderEditLink = ({ value }) => <a onClick={() => this.props.handleEditClick(value)}><Icon type="edit" /></a>;
  
  renderDeleteIcon = ({ value }) => (
    <Popconfirm
      title={<CategoryMessage />}
      onConfirm={() => this.props.handleDeleteClick(value)}
      onCancel={() => {}}
      okText="Yes"
      cancelText="No"
    >
      <a><Icon type="close" /></a>
    </Popconfirm>
  );

  renderAgeRange = ({value, data }) => {
    return <span>{`${value} to ${data.maximum_age}`}</span>;
  }

  renderGender = ({ value }) => <span>{value}</span>;

  renderData = ({ value }) => <span>{value.name || 'NA'}</span>;

  resetCategory = ((id, name) => {
    let category = CategoriesModel.get(id);
    category.props.name = name;
    new CategoriesModel(category.props).$save();
  })

  resetSubCategory = ((id, name) => {
    let category = SubCategoriesModel.get(id);
    category.props.name = name;
    new SubCategoriesModel(category.props).$save();
  })

  handleChange = ({ oldValue, newValue, colDef, data, node }) => {
    console.log(oldValue);
    if (!newValue.trim()) {
      if (!data.parent_id) {
        this.resetCategory(data.id, oldValue);
      } else {
        this.resetSubCategory(data.id, oldValue);
      }
      showWarningNotification('Category Name should not be empty.');
      this.api.refreshCells();
      return;
    }
    if (!data.parent_id) {
      const payload = {
        id: data.id,
        name: newValue,
      };
      this.props.updateCategory(payload);
    } else {
      const payload = {
        id: data.id,
        name: newValue,
      };
      this.props.updateSubcategory(data.parent_id, payload);
    }
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
              renderViewSubcategories: this.renderViewSubcategories,
              renderDelete: this.renderDeleteIcon,
            }}
          />
        </div>
      </div>
    );
  }
}

export default TableWrapper;
