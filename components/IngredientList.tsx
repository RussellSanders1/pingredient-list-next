import { DataGrid, GridColumns } from '@mui/x-data-grid';
import React from 'react';
import { IngredientI } from '../lib/models/ingredient';
import AmountCell from './AmountCell';

const inventoryColumns: GridColumns = [
  {
    field: 'name',
    headerName: 'Ingredient',
    editable: false,
    renderCell: (params) => (params.value),
  },
  {
    field: 'quantity',
    headerName: 'Amount',
    editable: false,
    renderCell: (params) => (AmountCell(params.value)),
  },
];

interface IngredientListProps {
  ingredients: IngredientI[];
}

const IngredientList = ({ ingredients }: IngredientListProps) => (
  <DataGrid
    density="comfortable"
    hideFooter
    rows={ingredients.map((v, id) => ({ id, ...v }))}
    columns={inventoryColumns}
  />
);

export default IngredientList;