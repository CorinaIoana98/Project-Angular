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
// import { Shift } from '../shift';

@Injectable({
  providedIn: 'root',
})
export class UserServiceFirestoreService {
  constructor(
    private firestore: AngularFirestore,
    private firestore2: Firestore
  ) {}
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

  async updateUser(updatedProfile: { firstName: string; lastName: string }) {
    const auth = getAuth();
    console.log(auth);

    const userDocRef = doc(this.firestore2, 'users', auth.currentUser.uid);
    const userDoc = getDoc(userDocRef);
    let userData =(await userDoc).data();

    userData['firstName'] = updatedProfile.firstName;
    userData['lastName'] = updatedProfile.lastName;

    await updateDoc(userDocRef, userData);
  }

  async updateUserAdm(updatedProfile: { firstName: string; lastName: string }, selectedUser: any) {
    const userDocRef = doc(this.firestore2, 'users', selectedUser.userId);
  
    const userDoc = await getDoc(userDocRef);
    let userData = userDoc.data();
  
    userData['firstName'] = updatedProfile.firstName;
    userData['lastName'] = updatedProfile.lastName;
  
    await updateDoc(userDocRef, userData);
  }
  

  

  deleteUser(id: any, collection: any) {
    const document = this.firestore.collection(collection).doc(id);
    document.delete().catch((error) => {
      console.log(error);
    });
  }

  async addNewShift(shift) {
    const auth = getAuth();
    console.log(auth);

    let userDocRef = doc(this.firestore2, 'users', auth.currentUser.uid);
    await updateDoc(userDocRef, {
      shifts: arrayUnion(shift),
    });
  }

  async getShiftById(shiftName: any) {
    console.log(shiftName);
    const auth = getAuth();
    console.log(auth);

    const userDocRef = doc(this.firestore2, 'users', auth.currentUser.uid);
    const userDoc = getDoc(userDocRef);
    const userData = (await userDoc).data();
    const userShifts = userData['shifts'];

    return userShifts.find((shift) => shift.shiftName == shiftName);
  }

  async updateShift(shiftName: any, updatedShift: any) {
    console.log(shiftName);
    const auth = getAuth();
    console.log(auth);

    const userDocRef = doc(this.firestore2, 'users', auth.currentUser.uid);
    const userDoc = getDoc(userDocRef);
    const userData = (await userDoc).data();
    const userShifts = userData['shifts'];
    const userFilteredShift = userShifts.find(
      (shift) => shift.shiftName == shiftName
    );

    Object.assign(userFilteredShift, updatedShift);

    await updateDoc(userDocRef, { shifts: userData['shifts'] });
  }
}
