// a page that grabs the current user's shopping list
// which consists of the ingredients from selected recipes
// minus those that are in stock
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText'; import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import { Ingredient } from '../../lib/types';
import {GetServerSideProps} from 'next';

interface ShoppingListProps {
  ingredients: Ingredient[];
}

export default function ShoppingList({ ingredients }: ShoppingListProps) {
  return (
    <List dense>
      {ingredients.map((ingredient) => (
        <ListItem
          key={ingredient.name}
          secondaryAction={(
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          )}
        >
          <ListItemText
            primary={ingredient.name}
            secondary={ingredient.amount}
          />
        </ListItem>
      ))}
    </List>
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
