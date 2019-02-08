const ATCOI_HEADER = [
  { headerName: 'Make', field: 'make', sortable: true, editable: true },
  { headerName: 'Model', field: 'model' },
  { headerName: 'Price', field: 'price', sortable: true },
  { headerName: 'Action', field: 'view', minWidth: 100, cellRenderer: 'renderViewButton' },
];

export default ATCOI_HEADER;
