//should display the shopping list selected by the param
//and include editing quantities/names/deleting
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import ShoppingList from '../../components/ShoppingList';
import { getListById } from '../../lib/helpers';
import useAsyncInitialStateSetter from '../../lib/useAsyncInitialStateSetter';
import useAuthContext from '../../lib/useAuthContext';


const ShoppingListPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  if (!user){
    return null;
  }
  
  const [list, loading] = useAsyncInitialStateSetter(() => getListById(user.uid, router.query.id as string));
  
  if (loading){
    return <p>Loading...</p>;
  }
  return <ShoppingList ingredients={list.ingredients}/>;
};

export default ShoppingListPage;