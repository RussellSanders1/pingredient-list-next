import { query, where, getDocs } from 'firebase/firestore';
import { useUserContext } from '../lib/context';
import { db } from '../lib/firebase';
import ListType from '../lib/types/listType';
import useAsyncInitialStateSetter from '../lib/useAsyncInitialStateSetter';
import React from 'react';

interface ListOfListsProps {
  listType: ListType
}
const ListOfLists = ({ listType }: ListOfListsProps) => {
  const { user } = useUserContext();
  
  const getLists = async () => {
    const inventoryQuery = query(db.userLists(user.uid), where('type', '==', listType));
    const results = await getDocs(inventoryQuery);
    
    return results.docs.map(res => res.data());
  };
  const [lists, setLists] = useAsyncInitialStateSetter(getLists);
  
  if (!lists) {
    return <p>Loading inventory...</p>;
  }

  return (
    <>
    {lists.map((list) => (
      <h1 key={list.name}>{list.name} put a link here to show the inventory list</h1>
    ))}
    </>
  );
};

export default ListOfLists;