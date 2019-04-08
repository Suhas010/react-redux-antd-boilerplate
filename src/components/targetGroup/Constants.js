import moment from 'moment';

export const CONFIG = {
  genders: [
    { value: 0, name: 'All' },
    { value: 1, name: 'Male' },
    { value: 2, name: 'Female' },
    { value: 3, name: 'Other' },
    { value: 4, name: 'Special' },
  ],
  level: [
    { value: 10, name: 'Easy' },
    { value: 20, name: 'Medium' },
    { value: 30, name: 'Difficult' },
  ],
  questionTypes: [
    { value: 0, name: 'Select' },
    { value: 1, name: 'MultiSelect' },
    { value: 2, name: 'Paragraph' },
    { value: 3, name: 'DateTime' },
    { value: 4, name: 'Number' },
    { value: 5, name: 'Range' },
  ],
  triggerDate: [
    { value: 1, name: 'Now' },
    { value: 2, name: 'Tomorrow' },
    { value: 3, name: 'After three days' },
    { value: 4, name: 'After one week' },
    { value: 5, name: 'After one month' },
    { value: 6, name: 'After three month' },
    { value: 7, name: 'Custom date' },
  ],
};

export const DEFAULT_DATE = [
  { value: moment().add(1, 'h') },
  { value: moment().add(1, 'h') },
  { value: moment().add(1, 'd') },
  { value: moment().add(3, 'd') },
  { value: moment().add(7, 'd') },
  { value: moment().add(1, 'M') },
  { value: moment().add(3, 'M') },
  { value: moment() },
  { value: moment() },
];

export const TG_HEADER = [
  { headerName: 'Category', field: 'category.name', sortable: true, editable: false },
  { headerName: 'Sub Category', field: 'subcategory.name', sortable: true, editable: false },
  { headerName: 'Gender', field: 'gender', sortable: true, editable: false },
  { headerName: 'Age Group', field: 'minimum_age', sortable: true, editable: false, width: 200, cellRenderer: 'renderAgeRange' },
  // { headerName: 'Max Age', field: 'maximum_age', sortable: true, editable: false, width: 140 },
  // { headerName: 'Region Specific', field: 'region', sortable: true, editable: false, cellRenderer: 'renderSwitch' },
  { headerName: 'Country', field: 'country', width: 120, sortable: true, editable: false, cellRenderer: 'renderData' },
  { headerName: 'State', field: 'state', width: 120, sortable: true, editable: false, cellRenderer: 'renderData' },
  { headerName: 'City', field: 'city', width: 120, sortable: true, editable: false, cellRenderer: 'renderData' },
  { headerName: 'Tier', field: 'tier', width: 120, sortable: true, editable: false, cellRenderer: 'renderData' },
  { headerName: 'Edit', field: 'id', sortable: true, editable: false, width: 100, cellRenderer: 'renderEditLink' },
  { headerName: 'Action', field: 'id', sortable: true, editable: false, cellRenderer: 'renderViewLink' },

];
