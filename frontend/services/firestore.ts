import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, increment, onSnapshot } from 'firebase/firestore';

export async function incrementUserClicks(uid:string) 
export async function getUserClicks(uid:string): Promise<void> 
export function subscribeToUserClicks(uid:string, callback: (count:number) => void) 