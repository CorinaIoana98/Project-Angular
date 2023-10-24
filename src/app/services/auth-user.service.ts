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

  async signup(email, password, passwordConfirmation, fname, lname, isAdmin, shifts, birthDate) {
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
        passwordConfirmation,
        isAdmin,
        shifts,
        birthDate
      });
    } catch (err) {
      console.log('error in creating new account');
    }
    
  }

  async login(email, password) {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password) ;
      return true;
    } catch (err) {
      console.log('Error logging into the system');
      return false;
    }
    //conditie verificare firebase user daca exista
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
  async logout() {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (err) {
      console.log('An error occurred while trying to log out');
    }
  }

  async addNewShift(shift) {
    const auth = getAuth();
    return new Observable((observer) => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          let userDocRef = doc(this.firestore, 'users', user.uid);
          await updateDoc(userDocRef, {
            shift: arrayUnion(shift),
          });
          observer.next();
        } else {
          observer.next(null);
        }
      });
    });
  }
}
