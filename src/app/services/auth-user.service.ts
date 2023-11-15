import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { AngularFirestore } from '@angular/fire/firestore';

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  user,
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
import { Auth, onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  filter(arg0: (employee: any) => boolean) {
    throw new Error('Method not implemented.');
  }
  shifts: any;
  constructor(private firestore: Firestore, private route: Router) {}

  async signup(
    email,
    password,
    passwordConfirmation,
    fname,
    lname,
    isAdmin,
    shifts,
    birthDate
  ) {
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
        birthDate,
      });
    } catch (err) {
      console.log('error in creating new account');
    }
  }

  async login(email, password) {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (err) {
      console.log('Error logging into the system');
      return false;
    }
  }

  async isUserAdmin(): Promise<boolean> {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(this.firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData['isAdmin'] === true;
      }
    }

    return false; // User not found or not an admin
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
  async getEditShifts() {
    const auth = getAuth();
    return new Observable((observer) => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const userDocRef = doc(this.firestore, 'users', user.uid);
          const userDoc = getDoc(userDocRef);
          const userData = (await userDoc).data();
          observer.next(userData['shifts']);
        }
      });
    });
  }

  async deleteShifts(shift_Name) {
    const auth = getAuth();
    let userData: any;
    // this.shifts = [];
    return new Observable((observer) => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const userDocRef = doc(this.firestore, 'users', user.uid);
          const userDoc = getDoc(userDocRef);
          const userData = (await userDoc).data();
          const shiftIndex = userData['shifts'].findIndex(
            (element) => element.shiftName === shift_Name
          );
          userData['shifts'].splice(shiftIndex, 1);
          updateDoc(userDocRef, { shifts: userData['shifts'] });
          observer.next(userData['shifts']);
        }
      });
    });
  }

  async getAllShifts() {
    const usersCollection = collection(this.firestore, 'users');
    const usersQuery = query(usersCollection);
    const userDocs = await getDocs(usersQuery);

    let usersInfo = userDocs.docs.map((document) => ({
      ...document.data(),
    }));

    usersInfo = usersInfo.filter(
      (user) => user['shifts'] && user['shifts'].length > 0
    );

    return usersInfo;
  }

  async lastWeekShifts() {
    const usersCollection = collection(this.firestore, 'users');
    const usersQuery = query(usersCollection);
    const userDocs = await getDocs(usersQuery);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const lastWeekShifts = [];

    userDocs.docs.forEach((userDoc) => {
      const userData = userDoc.data();
      const firstName = userData['fname'];
      const lastName = userData['lname'];
      const shifts = userData['shifts'] || [];
      // console.log(shifts);

      shifts.forEach((shift) => {
        const shiftDate = new Date(shift.date);

        if (shiftDate >= sevenDaysAgo) {
          lastWeekShifts.push({
            user: `${firstName} ${lastName}`,
            shiftDate: shift.date,
          });
          // console.log(`User: ${firstName} ${lastName}` + " " + `Shift Date: ${shift.date}`);
        }
      });
    });
    console.log(lastWeekShifts);
    return lastWeekShifts;
  }

  async getAllWorkers() {
    const userCollection = collection(this.firestore, 'users');
    const usersQuery = query(userCollection);
    const userDocs = await getDocs(usersQuery);

    const allWorkers = [];
    userDocs.forEach((userDoc) => {
      const userData = userDoc.data();
      if (userData['isAdmin'] == false) {
        allWorkers.push({
          fname: userData['fname'],
          lname: userData['lname'],
          email: userData['email'],
        });
      }
    });
    // console.log(allWorkers);
    return allWorkers;
  }

  searchShifts(name: string, startDate: Date, endDate: Date, place: string) {
    const shiftsCollection = collection(this.firestore, 'users');
    let query: any;
    query = query(shiftsCollection);
    console.log(query);
    if (name) {
      query = where('name', '==', name);
    }
    if (startDate) {
      query = where('date', '>=', startDate);
    }
    if (endDate) {
      query = where('date', '<=', endDate);
    }
    if (place) {
      query = where('place', '==', place);
    }

    return getDocs(query);
  }
}
