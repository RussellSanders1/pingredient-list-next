import Amount, { AmountI } from './amount';

export interface IngredientI {
  name: string;
  amount: AmountI;
}

export default class Ingredient implements IngredientI {
  public name: string;

  public amount: AmountI;

  constructor(
    name: string = '',
    amount: AmountI = new Amount(),
  ) {
    this.name = name;
    this.amount = amount;
  }
}
