import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { IngredientI } from '../lib/models/ingredient';

export interface ShoppingListProps {
  ingredients: IngredientI[];
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
            secondary={ingredient.amount} />
        </ListItem>
      ))}
    </List>
  );
}
