export const CATEGORIES_HEADER = [
  { headerName: 'Name', field: 'name', sortable: true, editable: false, width: 200 },
  { headerName: 'Edit', field: 'id', sortable: true, editable: false, width: 100, cellRenderer: 'renderEditLink' },
  { headerName: 'Delete', field: 'id', sortable: true, editable: false, width: 100, cellRenderer: 'renderDelete' },
  { headerName: 'Action', field: 'id', sortable: true, editable: false, cellRenderer: 'renderViewSubcategories' },
];
