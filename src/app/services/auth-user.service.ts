import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
import { Observable } from 'rxjs';

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
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
import { onAuthStateChanged } from 'firebase/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private firestore: Firestore, private route: Router) {}

  async signup(email, password, fname, lname, isAdmin, shifts) {
    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userUid = userCredentials.user.uid;

      const userDoc = doc(this.firestore, 'users', userUid);
      await setDoc(userDoc, {
        fname,
        lname,
        email,
        password,
        isAdmin,
        shifts,
      });
    } catch (err) {
      console.log('error in creating new account');
    }
  }

  async login(email, password) {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log('Error logging into the system');
    }
  }
  
  async getCurrentUser() {
 
   const user = getAuth();
 return new Observable((observer) => {
      user.onAuthStateChanged(async (user) => {
        if (user) {
          let userDocRef = doc(this.firestore, 'users', user.uid);
          let userDoc = getDoc(userDocRef);

          const userData = {
            ...user,
            ...(await userDoc).data(),
          };
          observer.next(userData);
        } else {
          observer.next(null);
        }
      });
    });
}


    //  return new Observable((observer) => {
    //   auth.onAuthStateChanged(async (user) => {
    //     if (user) {
    //       let userDocRef = doc(this.firestore, 'users', user.uid);
    //       let userDoc = getDoc(userDocRef);

    //       const userData = {
    //         ...user,
    //         ...(await userDoc).data(),
    //       };
    //       observer.next(userData);
    //     } else {
    //       observer.next(null);
    //     }
    //   });
    // });


  async logout() {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (err) {
      console.log('An error occurred while trying to log out');
    }
  }

 
}
