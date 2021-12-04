// a page that displays a feed of recipes that
// each consist of the list of ingredients and
// quantity needed for each.

import ListOfLists from '../../components/ListOfLists';
import ListType from '../../lib/types/listType';
import React from 'react';

const Recipes = () => (<ListOfLists listType={ListType.Recipe} />);

export default Recipes;