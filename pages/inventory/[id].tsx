//should display the inventory selected by the param
//and include editing quantities/names/deleting
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import IngredientList from '../../components/IngredientList';
import { getListById } from '../../lib/helpers';
import useAsyncInitialStateSetter from '../../lib/useAsyncInitialStateSetter';
import useAuthContext from '../../lib/useAuthContext';


const InventoryPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  if (!user){
    return null;
  }

  const [inventory, loading] = useAsyncInitialStateSetter(() => getListById(user.uid, router.query.id as string));

  if (loading){
    return <p>Loading...</p>;
  }

  return <IngredientList ingredients={inventory.ingredients}/>;
};

export default InventoryPage;