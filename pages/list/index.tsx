// a page that grabs the current user's shopping list
// which consists of the ingredients from selected recipes

import ListOfLists from '../../components/ListOfLists';
import ListType from '../../lib/types/listType';
import React from 'react';

// minus those that are in stock
const ShoppingLists = () => (<ListOfLists listType={ListType.Shopping}/>);

export default ShoppingLists;