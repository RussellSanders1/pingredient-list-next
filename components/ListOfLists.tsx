import React from 'react';
import { getUserLists } from '../lib/helpers';
import ListType from '../lib/types/listType';
import useAsyncInitialStateSetter from '../lib/useAsyncInitialStateSetter';
import useAuthContext from '../lib/useAuthContext';

interface ListOfListsProps {
  listType: ListType
}
const ListOfLists = ({ listType }: ListOfListsProps) => {
  const { user } = useAuthContext();
  if (!user){
    return null;
  }
  
  const [lists, loading] = useAsyncInitialStateSetter(() => getUserLists(user!.uid, listType));
  
  if (loading) {
    return <p>Loading lists...</p>;
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