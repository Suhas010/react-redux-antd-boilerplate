export const SUB_CATEGORIES_HEADER = [
  { headerName: 'Name', field: 'name', sortable: true, editable: true, width: 200 },
  { headerName: 'Edit', field: 'id', sortable: true, editable: false, width: 100, cellRenderer: 'renderEditLink' },
  { headerName: 'Delete', field: 'id', sortable: true, editable: false, width: 100, cellRenderer: 'renderDelete' },
];
