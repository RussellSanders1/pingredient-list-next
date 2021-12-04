// a page that grabs the current user's
// inventory of ingredients from firebase and
// displays an ordered list with the ingredient name
// and the quantity in stock
import React from 'react';
import ListOfLists from '../../components/ListOfLists';
import ListType from '../../lib/types/listType';


export default function Inventory() {
  return <ListOfLists listType={ListType.Inventory}/>;
}
