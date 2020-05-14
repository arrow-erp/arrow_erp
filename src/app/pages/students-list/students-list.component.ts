import {Component} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {StudentDetailsInterface} from '../../interfaces/student-details.interface';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import * as firebase from 'firebase';
import {NgForm} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap';
import {OrderInterface} from '../../interfaces/order.interface';
import {OrderAndBatchesInterface} from '../../interfaces/order-and-batches.interface';
import {SettlementInterface} from '../../interfaces/settlement.interface';
import {switchMap} from 'rxjs/operators';

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
  editStudentId$ = new BehaviorSubject<string>('');
  studentWiseOrdersList = this.editStudentId$.pipe(
    switchMap(studentId => {
      console.log('studentId', studentId);
      return this.afs.collection('ordersList', ref => ref.where('studentId', '==', studentId)).valueChanges();
    })
  );
  orderId = '';
  selectedBatch = [];
  totalFee = 0;
  discount = 0;
  amountPaid = 0;
  tax = 0;
  private studentDetailsCollection: AngularFirestoreCollection<StudentDetailsInterface>;
  studentList: Observable<StudentDetailsInterface[]>;

  private orderCollection: AngularFirestoreCollection<OrderInterface>;
  orderList: Observable<OrderInterface[]>;

  private orderAndBatchesCollection: AngularFirestoreCollection<OrderAndBatchesInterface>;
  orderAndBatchesList: Observable<OrderAndBatchesInterface[]>;

  private settlementCollection: AngularFirestoreCollection<SettlementInterface>;
  settlementsList: Observable<SettlementInterface[]>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.studentDetailsCollection = afs.collection<StudentDetailsInterface>('studentList');
    this.studentList = this.studentDetailsCollection.valueChanges();

    this.orderCollection = afs.collection<OrderInterface>('ordersList');
    this.orderList = this.orderCollection.valueChanges();

    this.orderAndBatchesCollection = afs.collection<OrderAndBatchesInterface>('OrderAndBatchesList');
    this.orderAndBatchesList = this.orderAndBatchesCollection.valueChanges();

    this.settlementCollection = afs.collection<SettlementInterface>('settlementsList');
    this.settlementsList = this.settlementCollection.valueChanges();
  }

  async saveOrder(orderDetails, studentDetailsModal) {
    this.showLoader = true;
    const res = await this.orderCollection.add({
      ...orderDetails,
      createdOn: firebase.firestore.FieldValue.serverTimestamp()
    });
    const docRef = await this.orderCollection.doc(res.id);
    this.orderId = res.id;
    const doc = await docRef.get().toPromise();
    await docRef.set({...doc.data(), id: res.id, transactionId: res.id});
    for (const value of this.orderAndBatchesToSave(this.orderId)) {
      await this.saveOrderAndBatches(value);
    }
    await this.saveSettlement(this.getSettlementToSave(this.orderId));
    studentDetailsModal.hide();
    this.editStudentId = '';
    this.editStudentId$.next(this.editStudentId);
    this.orderId = '';
    this.selectedBatch = [];
    this.totalFee = 0;
    this.discount = 0;
    this.amountPaid = 0;
    this.tax = 0;
    this.showLoader = false;
  }

  async saveOrderAndBatches(orderAndBatchesDetails) {
    const res = await this.orderAndBatchesCollection.add({
      ...orderAndBatchesDetails,
      createdOn: firebase.firestore.FieldValue.serverTimestamp()
    });
    const docRef = await this.orderAndBatchesCollection.doc(res.id);
    this.orderId = res.id;
    const doc = await docRef.get().toPromise();
    await docRef.set({...doc.data(), id: res.id, transactionId: res.id});
  }

  async saveSettlement(settlementDetails) {
    const res = await this.settlementCollection.add({
      ...settlementDetails,
      createdOn: firebase.firestore.FieldValue.serverTimestamp()
    });
    const docRef = await this.settlementCollection.doc(res.id);
    this.orderId = res.id;
    const doc = await docRef.get().toPromise();
    await docRef.set({...doc.data(), id: res.id, transactionId: res.id});
  }

  getOrderToSave() {
    return {
      studentId: this.editStudentId,
      totalFee: this.totalFee,
      discount: this.discount,
      tax: this.tax,
      billAmount: this.amountPaid,
    };
  }

  getSettlementToSave(orderId) {
    return {
      studentId: this.editStudentId,
      orderId: orderId,
      amountPaid: this.amountPaid,
    };
  }

  orderAndBatchesToSave(orderId) {
    return this.selectedBatch.map(d => (
      {
        batchId: d.id,
        studentId: this.editStudentId,
        orderId: orderId,
      }
    ));
  }

  async saveDetails(studentDetails: StudentDetailsInterface, studentDetailsModal, arrowForm: NgForm) {
    if (this.formTitle === this.ADD_FORM_TITLE) {
      this.showLoader = true;
      const res = await this.studentDetailsCollection.add({
        ...studentDetails,
        createdOn: firebase.firestore.FieldValue.serverTimestamp()
      });
      const docRef = await this.studentDetailsCollection.doc(res.id);
      const doc = await docRef.get().toPromise();
      await docRef.set({...doc.data(), id: res.id, transactionId: res.id});
      arrowForm.resetForm();
      studentDetailsModal.hide();
      this.showLoader = false;
    }
    else {
      if (this.editStudentId.trim().length > 0) {
        this.showLoader = true;
        await this.studentDetailsCollection.doc(this.editStudentId).set({...studentDetails, id: this.editStudentId});
        arrowForm.resetForm();
        studentDetailsModal.hide();
        this.showLoader = false;
        this.editStudentId = '';
        this.editStudentId$.next(this.editStudentId);
      }
    }
  }

  async deleteDetails(student: StudentDetailsInterface) {
    const isConfirmed = confirm('Are you sure! Do you want to delete?');
    if (isConfirmed) {
      this.showLoader = true;
      await this.studentDetailsCollection.doc(student.id).delete();
      this.showLoader = false;
    }
  }

  editDetails(student: StudentDetailsInterface, studentDetailsModal: ModalDirective, arrowForm: NgForm) {
    this.editStudentId = student.id;
    this.editStudentId$.next(this.editStudentId);
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

