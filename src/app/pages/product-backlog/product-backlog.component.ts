import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import {ModalDirective} from 'ngx-bootstrap';
import {ProductBacklogDetailsInterface} from '../../interfaces/product-backlog-details.interface';

@Component({
  selector: 'arrow-product-backlog',
  templateUrl: './product-backlog.component.html',
  styleUrls: ['./product-backlog.component.scss']
})
export class ProductBacklogComponent{

  showLoader = false;
  readonly ADD_FORM_TITLE = 'Add New Product Backlog';
  readonly EDIT_FORM_TITLE = 'Update Product Backlog';
  formTitle = this.ADD_FORM_TITLE;
  editProductBacklogId = '';
  private productBacklogDetailsCollection: AngularFirestoreCollection<ProductBacklogDetailsInterface>;
  productBacklogList: Observable<ProductBacklogDetailsInterface[]>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.productBacklogDetailsCollection = afs.collection<ProductBacklogDetailsInterface>('ProductBacklogList', ref => ref.orderBy('priority'));
    this.productBacklogList = this.productBacklogDetailsCollection.valueChanges();
  }

  async saveDetails(productBacklogDetails: ProductBacklogDetailsInterface, productBacklogDetailsModal, arrowForm: NgForm) {
    if (this.formTitle === this.ADD_FORM_TITLE) {
      this.showLoader = true;
      const res = await this.productBacklogDetailsCollection.add({
        ...productBacklogDetails,
        createdOn: firebase.firestore.FieldValue.serverTimestamp()
      });
      const docRef = await this.productBacklogDetailsCollection.doc(res.id);
      const doc = await docRef.get().toPromise();
      await docRef.set({...doc.data(), id: res.id, transactionId: res.id});
      arrowForm.resetForm();
      productBacklogDetailsModal.hide();
      this.showLoader = false;
    }
    else {
      if (this.editProductBacklogId.trim().length > 0) {
        this.showLoader = true;
        await this.productBacklogDetailsCollection.doc(this.editProductBacklogId).set({...productBacklogDetails, id: this.editProductBacklogId});
        arrowForm.resetForm();
        productBacklogDetailsModal.hide();
        this.showLoader = false;
        this.editProductBacklogId = '';
      }
    }
  }

  async deleteDetails(productBacklog: ProductBacklogDetailsInterface) {
    const isConfirmed = confirm('Are you sure! Do you want to delete?');
    if (isConfirmed) {
      this.showLoader = true;
      await this.productBacklogDetailsCollection.doc(productBacklog.id).delete();
      this.showLoader = false;
    }
  }

  editDetails(productBacklog: ProductBacklogDetailsInterface, productBacklogDetailsModal: ModalDirective, arrowForm: NgForm) {
    this.editProductBacklogId = productBacklog.id;
    arrowForm.resetForm(productBacklog);
    this.formTitle = this.EDIT_FORM_TITLE;
    productBacklogDetailsModal.show();
  }

  addDetails(productBacklogDetailsModal: ModalDirective, arrowForm: NgForm) {
    arrowForm.resetForm();
    this.formTitle = this.ADD_FORM_TITLE;
    productBacklogDetailsModal.show();
  }
}
