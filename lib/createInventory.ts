import { addDoc, collection } from '@firebase/firestore';
import { getDoc } from 'firebase/firestore';
import { firestore, db} from './firebase';
import { createDummyIngredientList } from './helpers';
import { List, ListType } from './types';

export const createInventory = async (uid: string) => {
  const inventory = new List('Inventory', ListType.Inventory, createDummyIngredientList());
  const inventoryDoc = await addDoc(db.userLists(uid), { ...inventory });
  const val = await getDoc(inventoryDoc);
  if (!val.exists()) {
    console.error(`Default list not created for user ${uid}`);
  }
  return val.data() as List;
};
