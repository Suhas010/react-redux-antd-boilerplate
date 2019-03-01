import { getUUID } from '../../utils/commonFunctions';

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
  date: [
    { value: 1, name: 'Now' },
    { value: 2, name: 'Tomorrow' },
    { value: 3, name: 'After three days' },
    { value: 4, name: 'After one week' },
    { value: 5, name: 'After one month' },
    { value: 6, name: 'After three month' },
    { value: 7, name: 'Custom date' },
  ],
};

export const TG = [
  {
    id: 123123123123,
    gender: 'Male',
    minAge: 2,
    maxAge: 14,
    region: true,
    country: 'India',
    state: 'Maharashtra',
    city: 'Pune',
    tire: 1,
  },
  {
    id: 123123123,
    gender: 'Male',
    minAge: 2,
    maxAge: 14,
    region: false,
    country: 'India',
    state: 'Maharashtra',
    city: 'Pune',
    tire: 1,
  },
];

export const TG_DATA = [
  { id: getUUID(), gender: 'Male', minimum_age: 2, maximum_age: 14, region: false, country: 'India', state: 'Maharashtra', city: 'Pune', tier: 'Two'},
  { id: getUUID(), gender: 'Female', minimum_age: 2, maximum_age: 12, region: true, country: 'India', state: 'Maharashtra', city: 'Pune', tier: 'Two'}
];

export const TG_HEADER = [
  { headerName: 'Gender', field: 'gender', sortable: true, editable: true, cellRenderer: 'renderGender' },
  { headerName: 'Min Age', field: 'minimum_age', sortable: true, editable: true, width: 140 },
  { headerName: 'Max Age', field: 'maximum_age', sortable: true, editable: true, width: 140 },
  { headerName: 'Region', field: 'region', sortable: true, editable: true, cellRenderer: 'renderSwitch' },
  { headerName: 'Country', field: 'country', sortable: true, editable: true },
  { headerName: 'State', field: 'state', sortable: true, editable: true },
  { headerName: 'City', field: 'city', sortable: true, editable: true },
  { headerName: 'Tier', field: 'tier', sortable: true, editable: true },
  { headerName: 'Action', field: 'id', sortable: true, editable: true, cellRenderer: 'renderEditViewLink', width: 300 },
];
