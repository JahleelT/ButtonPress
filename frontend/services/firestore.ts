import { db } from './firebase.ts';
import { doc, getDoc, setDoc, increment, onSnapshot } from 'firebase/firestore';

export async function incrementUserClicks(uid:string) {
  const userDoc = doc(db, 'clicks', uid);
  await setDoc(userDoc, {count: increment(1)}, {merge:true});
};

export async function getUserClicks(uid:string): Promise<number> {
  const userDoc = doc(db, 'clicks', uid);
  const snapshot = await getDoc(userDoc);

  if (snapshot.exists()) {
    return snapshot.data().count || 0;
  } else {
    return 0;
  }

};

export function subscribeToUserClicks(uid:string, callback: (count:number) => void) {
  const userDoc = doc(db, 'clicks', uid);
  
  const unsub = onSnapshot(userDoc, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data().count || 0);
    } else {
      callback(0);
    }

  })

  return unsub;
}