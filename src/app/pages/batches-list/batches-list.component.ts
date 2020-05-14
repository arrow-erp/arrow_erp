import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {ModalDirective} from 'ngx-bootstrap';
import {NgForm} from '@angular/forms';
import {BatchDetailsInterface} from '../../interfaces/batch-details.interface';
import * as firebase from 'firebase';
import {FacultyDetailsInterface} from '../../interfaces/faculty-details.interface';
import {StudentDetailsInterface} from '../../interfaces/student-details.interface';
import {CourseDetailsInterface} from '../../interfaces/course-details.interface';

@Component({
  selector: 'arrow-batchs-list',
  templateUrl: './batches-list.component.html',
  styleUrls: ['./batches-list.component.scss']
})
export class BatchesListComponent {

  showLoader = false;
  readonly ADD_FORM_TITLE = 'Add New Batch Details';
  readonly EDIT_FORM_TITLE = 'Update Batch Details';
  formTitle = this.ADD_FORM_TITLE;
  editBatchId = '';

  private batchDetailsCollection: AngularFirestoreCollection<BatchDetailsInterface>;
  batchList: Observable<BatchDetailsInterface[]>;

  private facultyDetailsCollection: AngularFirestoreCollection<FacultyDetailsInterface>;
  facultyList: Observable<FacultyDetailsInterface[]>;

  private studentDetailsCollection: AngularFirestoreCollection<StudentDetailsInterface>;
  studentList: Observable<StudentDetailsInterface[]>;

  private courseDetailsCollection: AngularFirestoreCollection<CourseDetailsInterface>;
  courseList: Observable<CourseDetailsInterface[]>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.batchDetailsCollection = afs.collection<BatchDetailsInterface>('batchList');
    this.batchList = this.batchDetailsCollection.valueChanges();

    this.facultyDetailsCollection = afs.collection<FacultyDetailsInterface>('facultyList');
    this.facultyList = this.facultyDetailsCollection.valueChanges();

    this.studentDetailsCollection = afs.collection<StudentDetailsInterface>('studentList');
    this.studentList = this.studentDetailsCollection.valueChanges();

    this.courseDetailsCollection = afs.collection<CourseDetailsInterface>('courseList');
    this.courseList = this.courseDetailsCollection.valueChanges();
  }

  async saveDetails(batchDetails: BatchDetailsInterface, batchDetailsModal, arrowForm: NgForm) {
    if (this.formTitle === this.ADD_FORM_TITLE) {
      this.showLoader = true;
      const res = await this.batchDetailsCollection.add({
        ...batchDetails,
        createdOn: firebase.firestore.FieldValue.serverTimestamp()
      });
      const docRef = await this.batchDetailsCollection.doc(res.id);
      const doc = await docRef.get().toPromise();
      await docRef.set({...doc.data(), id: res.id, transactionId: res.id});
      arrowForm.resetForm();
      batchDetailsModal.hide();
      this.showLoader = false;
    }
    else {
      if (this.editBatchId.trim().length > 0) {
        this.showLoader = true;
        await this.batchDetailsCollection.doc(this.editBatchId).set({...batchDetails, id: this.editBatchId});
        arrowForm.resetForm();
        batchDetailsModal.hide();
        this.showLoader = false;
        this.editBatchId = '';
      }
    }
  }

  async deleteDetails(batch: BatchDetailsInterface) {
    const isConfirmed = confirm('Are you sure! Do you want to delete?');
    if (isConfirmed) {
      this.showLoader = true;
      await this.batchDetailsCollection.doc(batch.id).delete();
      this.showLoader = false;
    }
  }

  editDetails(batch: BatchDetailsInterface, batchDetailsModal: ModalDirective, arrowForm: NgForm) {
    this.editBatchId = batch.id;
    arrowForm.resetForm(batch);
    this.formTitle = this.EDIT_FORM_TITLE;
    batchDetailsModal.show();
  }

  addDetails(batchDetailsModal: ModalDirective, arrowForm: NgForm) {
    arrowForm.resetForm();
    this.formTitle = this.ADD_FORM_TITLE;
    batchDetailsModal.show();
  }
}
