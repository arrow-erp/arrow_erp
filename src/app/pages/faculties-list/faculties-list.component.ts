import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import {ModalDirective} from 'ngx-bootstrap';
import {FacultyDetailsInterface} from './FacultyDetails.interface';
// faculty
// Faculty
@Component({
  selector: 'arrow-faculties-list',
  templateUrl: './faculties-list.component.html',
  styleUrls: ['./faculties-list.component.scss']
})
export class FacultiesListComponent {

  showLoader = false;
  readonly ADD_FORM_TITLE = 'Add New Faculty Details';
  readonly EDIT_FORM_TITLE = 'Update Faculty Details';
  formTitle = this.ADD_FORM_TITLE;
  editFacultyId = '';
  private facultyDetailsCollection: AngularFirestoreCollection<FacultyDetailsInterface>;
  facultyList: Observable<FacultyDetailsInterface[]>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.facultyDetailsCollection = afs.collection<FacultyDetailsInterface>('facultyList');
    this.facultyList = this.facultyDetailsCollection.valueChanges();
  }

  async saveDetails(facultyDetails: FacultyDetailsInterface, facultyDetailsModal, arrowForm: NgForm) {
    if (this.formTitle === this.ADD_FORM_TITLE) {
      this.showLoader = true;
      const res = await this.facultyDetailsCollection.add({
        ...facultyDetails,
        createdOn: firebase.firestore.FieldValue.serverTimestamp()
      });
      const docRef = await this.facultyDetailsCollection.doc(res.id);
      const doc = await docRef.get().toPromise();
      await docRef.set({...doc.data(), id: res.id, transactionId: res.id});
      arrowForm.resetForm();
      facultyDetailsModal.hide();
      this.showLoader = false;
    }
    else {
      if (this.editFacultyId.trim().length > 0) {
        this.showLoader = true;
        await this.facultyDetailsCollection.doc(this.editFacultyId).set({...facultyDetails, id: this.editFacultyId});
        arrowForm.resetForm();
        facultyDetailsModal.hide();
        this.showLoader = false;
        this.editFacultyId = '';
      }
    }
  }

  async deleteDetails(faculty: FacultyDetailsInterface) {
    const isConfirmed = confirm('Are you sure! Do you want to delete?');
    if (isConfirmed) {
      this.showLoader = true;
      await this.facultyDetailsCollection.doc(faculty.id).delete();
      this.showLoader = false;
    }
  }

  editDetails(faculty: FacultyDetailsInterface, facultyDetailsModal: ModalDirective, arrowForm: NgForm) {
    this.editFacultyId = faculty.id;
    arrowForm.resetForm(faculty);
    this.formTitle = this.EDIT_FORM_TITLE;
    facultyDetailsModal.show();
  }

  addDetails(facultyDetailsModal: ModalDirective, arrowForm: NgForm) {
    arrowForm.resetForm();
    this.formTitle = this.ADD_FORM_TITLE;
    facultyDetailsModal.show();
  }
}
