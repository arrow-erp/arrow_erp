import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import {ModalDirective} from 'ngx-bootstrap';
import {CourseDetailsInterface} from '../../interfaces/course-details.interface';

@Component({
  selector: 'arrow-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {

  showLoader = false;
  readonly ADD_FORM_TITLE = 'Add New Course Details';
  readonly EDIT_FORM_TITLE = 'Update Course Details';
  formTitle = this.ADD_FORM_TITLE;
  editCourseId = '';
  private courseDetailsCollection: AngularFirestoreCollection<CourseDetailsInterface>;
  courseList: Observable<CourseDetailsInterface[]>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.courseDetailsCollection = afs.collection<CourseDetailsInterface>('courseList');
    this.courseList = this.courseDetailsCollection.valueChanges();
  }

  async saveDetails(courseDetails: CourseDetailsInterface, courseDetailsModal, arrowForm: NgForm) {
    if (this.formTitle === this.ADD_FORM_TITLE) {
      this.showLoader = true;
      const res = await this.courseDetailsCollection.add({
        ...courseDetails,
        createdOn: firebase.firestore.FieldValue.serverTimestamp()
      });
      const docRef = await this.courseDetailsCollection.doc(res.id);
      const doc = await docRef.get().toPromise();
      await docRef.set({...doc.data(), id: res.id, transactionId: res.id});
      arrowForm.resetForm();
      courseDetailsModal.hide();
      this.showLoader = false;
    }
    else {
      if (this.editCourseId.trim().length > 0) {
        this.showLoader = true;
        await this.courseDetailsCollection.doc(this.editCourseId).set({...courseDetails, id: this.editCourseId});
        arrowForm.resetForm();
        courseDetailsModal.hide();
        this.showLoader = false;
        this.editCourseId = '';
      }
    }
  }

  async deleteDetails(course: CourseDetailsInterface) {
    const isConfirmed = confirm('Are you sure! Do you want to delete?');
    if (isConfirmed) {
      this.showLoader = true;
      await this.courseDetailsCollection.doc(course.id).delete();
      this.showLoader = false;
    }
  }

  editDetails(course: CourseDetailsInterface, courseDetailsModal: ModalDirective, arrowForm: NgForm) {
    this.editCourseId = course.id;
    arrowForm.resetForm(course);
    this.formTitle = this.EDIT_FORM_TITLE;
    courseDetailsModal.show();
  }

  addDetails(courseDetailsModal: ModalDirective, arrowForm: NgForm) {
    arrowForm.resetForm();
    this.formTitle = this.ADD_FORM_TITLE;
    courseDetailsModal.show();
  }
}
