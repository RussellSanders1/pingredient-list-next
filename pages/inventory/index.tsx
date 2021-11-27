// a page that grabs the current user's
// inventory of ingredients from firebase and
// displays an ordered list with the ingredient name
// and the quantity in stock
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { doc, getDoc, where } from '@firebase/firestore';
import { query, collection, getDocs } from 'firebase/firestore';
import { UserContext } from '../../lib/context';
import {
  AmountI, Ingredient, IngredientI, List, ListI, ListType,
} from '../../lib/types';
import { firestore } from '../../lib/firebase';
import { createInventory } from '../../lib/createInventory';
import useAsyncInitialStateSetter from '../../lib/useAsyncInitialStateSetter';
import {GetServerSideProps} from 'next';
import AmountCell from '../../components/AmountCell';

interface InventoryProps {
  ingredients: Ingredient[];
}

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

export default function Inventory({ ingredients }: InventoryProps) {
  const { user } = useContext(UserContext);
  const [inventory, setInventory] = useState<ListI | null>(null);

  const getInventory = async () => {
    const inventoryQuery = query(collection(firestore, `users/${user.uid}/lists`), where('type', '==', ListType.Inventory));
    const inventory = await getDocs(inventoryQuery);

    let inventoryList: ListI;
    if (inventory.empty) {
      inventoryList = await createInventory(user.uid);
    } else {
      inventoryList = inventory.docs[0].data() as ListI;
    }

    return inventoryList;
  };

  useAsyncInitialStateSetter(getInventory, setInventory);

  if (!inventory) {
    return <p>Loading inventory...</p>;
  }

  return (
    <DataGrid
      density="comfortable"
      hideFooter
      rows={inventory.ingredients.map((v, id) => ({ id, ...v }))}
      columns={inventoryColumns}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      ingredients: [
        { ...new Ingredient('Butter') },
        { ...new Ingredient('Milk') },
        { ...new Ingredient('Eggs') },
      ],
    },
  };
}
