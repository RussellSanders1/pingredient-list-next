import { QueryDocumentSnapshot, FirestoreDataConverter, DocumentData, getDocs, query, where, getDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import Ingredient from './models/ingredient';
import { ListI } from './models/list';
import ListType from './types/listType';
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

export const getUserLists = async (uid: string, listType: ListType): Promise<ListI[]> => {
  const listQuery = query(db.userLists(uid), where('type', '==', listType));
  const results = await getDocs(listQuery);
  
  return results.docs.map(res => res.data());
};

export const getListById = async (uid: string, id: string): Promise<ListI> => {
  const listDoc = await getDoc(doc(db.userLists(uid), id));
  if (!listDoc.exists()){
    throw new Error(`could not find list with id ${id}`);
  }
  return listDoc.data();
};