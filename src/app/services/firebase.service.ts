import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/Firestore';
import { onSnapshot } from 'firebase/firestore';
import { getAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import {
  Firestore,
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Shift } from '../shift';

@Injectable({
  providedIn: 'root',
})
export class UserServiceFirestoreService {
  constructor(private firestore: AngularFirestore, private firestore2: Firestore) {}
  getUsers() {
    return this.firestore.collection('Users').snapshotChanges();
  }
  saveUser(user: any) {
    this.firestore
      .collection('Users')
      .add(user)
      .then((document) => {
        console.log('User added: ', document);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  updateUser(id: any, user: any, collection: any) {
    const document = this.firestore.collection(collection).doc(id);
    document
      .update(user)
      .then((data) => {
        console.log('user is updated', data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  deleteUser(id: any, collection: any) {
    const document = this.firestore.collection(collection).doc(id);
    document.delete().catch((error) => {
      console.log(error);
    });
  }
  
  async addNewShift(shift) {
    console.log("adsgdf");
    const auth = getAuth();
    console.log(auth);

    let userDocRef = doc(this.firestore2, 'users', auth.currentUser.uid);
    await updateDoc(userDocRef, {
               shifts: arrayUnion(shift),
             });

  }
  
}
