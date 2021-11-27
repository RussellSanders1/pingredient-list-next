import {IngredientI} from "./ingredient";

export enum ListType {
  Inventory,
  Shopping,
  Recipe
}

export interface ListI {
  name: string;
  type: ListType;
  ingredients: IngredientI[];
}

export default class List implements ListI {
  public name: string;

  public type: ListType;

  public ingredients: IngredientI[];

  constructor(
    name: string = 'Inventory',
    type: ListType = 0,
    ingredients: IngredientI[] = [],
  ) {
    this.name = name;
    this.type = type;
    this.ingredients = ingredients;
  }
}
