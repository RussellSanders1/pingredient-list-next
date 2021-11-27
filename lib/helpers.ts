import type { QueryDocumentSnapshot } from '@firebase/firestore';
import { Ingredient, Measurement } from './types';

export const createDummyIngredientList = () => [
  { ...new Ingredient('Milk', { value: 1, measurement: Measurement.gallon }) },
  { ...new Ingredient('Butter', { value: 1, measurement: Measurement.tbsp }) },
  { ...new Ingredient('Eggs', { value: 12, measurement: Measurement.scalar }) },
];

export const converter = <T>() => ({
  toFirestore: (data: Partial<T>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});
