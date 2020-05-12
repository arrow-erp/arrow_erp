import {Component} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {StudentDetailsInterface} from './StudentDetails.interface';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'arrow-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent {

  /*data = [
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
  ];


  constructor(public auth: AngularFireAuth) {
    this.auth.user.subscribe(data => {
      console.log(data);
    });
  }
  login() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }*/
  showLoader = false;
  private itemsCollection: AngularFirestoreCollection<StudentDetailsInterface>;
  studentList: Observable<StudentDetailsInterface[]>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.itemsCollection = afs.collection<StudentDetailsInterface>('studentList');
    this.studentList = this.itemsCollection.valueChanges();
  }

  async saveDetails(studentDetails: StudentDetailsInterface, studentDetailsModal) {
    this.showLoader = true;
    const res = await this.itemsCollection.add({
      ...studentDetails,
      createdOn: firebase.firestore.FieldValue.serverTimestamp()
    });
    const docRef = await this.itemsCollection.doc(res.id);
    const doc = await docRef.get().toPromise();
    await docRef.set({...doc.data(), id: res.id, transactionId: res.id});
    studentDetailsModal.hide();
    this.showLoader = false;
  }

  async deleteDetails(student: StudentDetailsInterface) {
    const isConfirmed = confirm('Are you sure! Do you want to delete?');
    if (isConfirmed) {
      this.showLoader = true;
      await this.itemsCollection.doc(student.id).delete();
      this.showLoader = false;
    }
  }
}

