import type { QueryDocumentSnapshot, FirestoreDataConverter, DocumentData } from 'firebase/firestore';
import Ingredient from './models/ingredient';
import Measurement from './types/measurement';

export const createDummyIngredientList = () => [
  { ...new Ingredient('Milk', { value: 1, measurement: Measurement.gallon }) },
  { ...new Ingredient('Butter', { value: 1, measurement: Measurement.tbsp }) },
  { ...new Ingredient('Eggs', { value: 12, measurement: Measurement.scalar }) },
];

export const converter = <T>(): FirestoreDataConverter<T> =>{
  return {
    toFirestore: (data: T): DocumentData => {
      return { ...data };
    },
    fromFirestore: (
      snapshot: QueryDocumentSnapshot,
    ): T => {
      return snapshot.data() as T;
    },
  };
};

