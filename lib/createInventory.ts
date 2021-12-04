import { addDoc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { createDummyIngredientList } from './helpers';
import List, { ListI } from './models/list';
import ListType from './types/listType';

export const createInventory = async (uid: string) => {
  const inventory = new List('Inventory', ListType.Inventory, createDummyIngredientList());
  const inventoryDoc = await addDoc(db.userLists(uid), { ...inventory });
  const val = await getDoc(inventoryDoc);
  if (!val.exists()) {
    console.error(`Default list not created for user ${uid}`);
  }
  return val.data() as ListI;
};
