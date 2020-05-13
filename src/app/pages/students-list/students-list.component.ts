import {Component} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {StudentDetailsInterface} from './StudentDetails.interface';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import {NgForm} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'arrow-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent {

  showLoader = false;
  readonly ADD_FORM_TITLE = 'Add New Student Details';
  readonly EDIT_FORM_TITLE = 'Update Student Details';
  formTitle = this.ADD_FORM_TITLE;
  editStudentId = '';
  private itemsCollection: AngularFirestoreCollection<StudentDetailsInterface>;
  studentList: Observable<StudentDetailsInterface[]>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.itemsCollection = afs.collection<StudentDetailsInterface>('studentList');
    this.studentList = this.itemsCollection.valueChanges();
  }

  async saveDetails(studentDetails: StudentDetailsInterface, studentDetailsModal, arrowForm: NgForm) {
    if (this.formTitle === this.ADD_FORM_TITLE) {
      this.showLoader = true;
      const res = await this.itemsCollection.add({
        ...studentDetails,
        createdOn: firebase.firestore.FieldValue.serverTimestamp()
      });
      const docRef = await this.itemsCollection.doc(res.id);
      const doc = await docRef.get().toPromise();
      await docRef.set({...doc.data(), id: res.id, transactionId: res.id});
      arrowForm.resetForm();
      studentDetailsModal.hide();
      this.showLoader = false;
    }
    else {
      if (this.editStudentId.trim().length > 0) {
        this.showLoader = true;
        await this.itemsCollection.doc(this.editStudentId).set({...studentDetails, id: this.editStudentId});
        arrowForm.resetForm();
        studentDetailsModal.hide();
        this.showLoader = false;
        this.editStudentId = '';
      }
    }
  }

  async deleteDetails(student: StudentDetailsInterface) {
    const isConfirmed = confirm('Are you sure! Do you want to delete?');
    if (isConfirmed) {
      this.showLoader = true;
      await this.itemsCollection.doc(student.id).delete();
      this.showLoader = false;
    }
  }

  editDetails(student: StudentDetailsInterface, studentDetailsModal: ModalDirective, arrowForm: NgForm) {
    this.editStudentId = student.id;
    arrowForm.resetForm(student);
    this.formTitle = this.EDIT_FORM_TITLE;
    studentDetailsModal.show();
  }

  addDetails(studentDetailsModal: ModalDirective, arrowForm: NgForm) {
    arrowForm.resetForm();
    this.formTitle = this.ADD_FORM_TITLE;
    studentDetailsModal.show();
  }
}

