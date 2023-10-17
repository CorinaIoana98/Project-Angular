import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/Firestore';
import { onSnapshot } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserServiceFirestoreService {
  constructor(private firestore: AngularFirestore) {}
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
}
