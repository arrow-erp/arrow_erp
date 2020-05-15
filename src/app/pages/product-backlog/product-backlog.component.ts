import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import {ModalDirective} from 'ngx-bootstrap';
import {ProductBacklogDetailsInterface} from '../../interfaces/product-backlog-details.interface';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'arrow-product-backlog',
  templateUrl: './product-backlog.component.html',
  styleUrls: ['./product-backlog.component.scss']
})
export class ProductBacklogComponent {

  showLoader = false;
  readonly ADD_FORM_TITLE = 'Add New Product Backlog';
  readonly EDIT_FORM_TITLE = 'Update Product Backlog';
  formTitle = this.ADD_FORM_TITLE;
  editProductBacklogId = '';
  private productBacklogDetailsCollection: AngularFirestoreCollection<ProductBacklogDetailsInterface>;
  productBacklogList$: Observable<ProductBacklogDetailsInterface[]>;
  productBacklogsList: ProductBacklogDetailsInterface[] = null;
  mockData: ProductBacklogDetailsInterface[] = [
    {
      'productBacklogName': 'COURSES MANAGEMENT',
      'productBacklogRemarks': 'Target Date by 17-May-2020',
      'id': 'JchmLxe4N8BEUwWwmV46',
      'developmentStatus': 'Development In progress',
      'designingStatus': 'Design In progress',
      'priority': 0
    }, {
      'productBacklogName': 'BATCHES MANAGEMENT',
      'productBacklogRemarks': 'Target Date by 17-May-2020',
      'id': 'o0GgKSPciP2nSb0zBrzr',
      'developmentStatus': 'Development In progress',
      'designingStatus': 'Design In progress',
      'priority': 1
    }, {
      'productBacklogRemarks': null,
      'id': 'OvaMVkFmSprYf1TIcpbB',
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 2,
      'productBacklogName': 'DASHBOARD'
    }, {
      'productBacklogName': 'STUDENT MANAGEMENT',
      'productBacklogRemarks': null,
      'id': 'BlJ07JEmlY9CiQE4znwj',
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 3
    }, {
      'productBacklogRemarks': null,
      'id': 'guFiK2aB94jmyU4uXfho',
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 4,
      'productBacklogName': 'STAFF MANAGEMENT'
    }, {
      'productBacklogName': 'FEES COLLECTION',
      'productBacklogRemarks': null,
      'id': 'byg5YiE5uHOgg50qQ5Pz',
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 5
    }, {
      'productBacklogName': 'ACCOUNT MAINTENANCE',
      'productBacklogRemarks': null,
      'id': '3MA40sOBBiJxLHg6yP1V',
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 6
    }, {
      'productBacklogRemarks': null,
      'id': 'BiQhIz5SCKeJGmBU3Wvf',
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 7,
      'productBacklogName': 'Admin dashboard'
    }, {
      'productBacklogName': 'Student dashboard',
      'productBacklogRemarks': null,
      'id': 'VqBIXI6TJfRTIX7knIqW',
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 8
    }, {
      'productBacklogRemarks': null,
      'id': 'a7FoWHdSOeC1Tku5Z9Vi',
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 9,
      'productBacklogName': 'Faculty dashboard'
    }, {
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 10,
      'productBacklogName': 'Parent dashboard',
      'productBacklogRemarks': null,
      'id': 'jV3sE80tm4cSs0J7ix2w'
    }, {
      'productBacklogName': 'Student late arrival and early departure',
      'productBacklogRemarks': null,
      'id': 'Gw1YjlhKWkICNcl0U2Sc',
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 11
    }, {
      'productBacklogName': 'Faculty time table',
      'productBacklogRemarks': null,
      'id': 'LOkQ9jW7k1Wby6UbClAP',
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 12
    }, {
      'productBacklogName': 'Homework',
      'productBacklogRemarks': null,
      'id': '1PCiypughV2NTeu6NpW9',
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 13
    }, {
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 14,
      'productBacklogName': 'Online and offline exams',
      'productBacklogRemarks': null,
      'id': 'PsGm1LSPY6qC5brhQ3Nd'
    }, {
      'productBacklogName': 'Student timetable',
      'productBacklogRemarks': null,
      'id': '2VYJ3gLQqufKyKSRspIW',
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 15
    }, {
      'productBacklogName': 'Online payment module',
      'productBacklogRemarks': null,
      'id': 'DUceeCBECUDZRqZVYueG',
      'developmentStatus': 'Development In progress',
      'designingStatus': 'Design No Started',
      'priority': 16
    }, {
      'productBacklogName': 'Front office visitor book',
      'productBacklogRemarks': null,
      'id': '9Vggf80yUpj42V1Vg8j1',
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 17
    }, {
      'productBacklogName': 'Events and holidays screen',
      'productBacklogRemarks': null,
      'id': 'c0izNWVAwdfAdXyZDAZ8',
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 18
    }, {
      'productBacklogName': 'Generate student certificate',
      'productBacklogRemarks': null,
      'id': 'eLaY0bibOMsUhZKiQsVU',
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 19
    }, {
      'productBacklogName': 'Front office complaint',
      'productBacklogRemarks': null,
      'id': '5HPMXzsyo6FvSUEtfrHW',
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 20
    }, {
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 21,
      'productBacklogName': 'Front office enquiry',
      'productBacklogRemarks': null,
      'id': 'hE4hzSSYzPPm358cu1lF'
    }, {
      'productBacklogRemarks': null,
      'id': 'hJNQTDFeUsEPF7nVcz2u',
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 22,
      'productBacklogName': 'Student attendance screen'
    }, {
      'productBacklogName': 'Staff attendance screen',
      'productBacklogRemarks': null,
      'id': 'EpPrQKaLVis8dmSA7uTq',
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 23
    }, {
      'productBacklogName': 'Payroll page',
      'productBacklogRemarks': null,
      'id': 'nbnkQIeTVdlrMlFsVqjA',
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 24
    }, {
      'productBacklogName': 'Generate student identity card',
      'productBacklogRemarks': null,
      'id': 'nqFq8i9rVTxszLeTZfm1',
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 25
    }, {
      'developmentStatus': 'Development No Started',
      'designingStatus': 'Design No Started',
      'priority': 26,
      'productBacklogName': 'Front office call and follow up',
      'productBacklogRemarks': null,
      'id': 'vzG3IRlB54K3KF2wKPIT'
    }];

  constructor(
    private afs: AngularFirestore
  ) {
    this.productBacklogDetailsCollection = afs.collection<ProductBacklogDetailsInterface>('ProductBacklogList', ref => ref.orderBy('priority'));
    this.productBacklogList$ = this.productBacklogDetailsCollection.valueChanges();
    const subscriber = this.productBacklogList$.subscribe(value => {
      this.productBacklogsList = value;
    });

    /*this.mockData.forEach(async (pro) => {
      const docRef = await this.productBacklogDetailsCollection.doc(pro.id);
      const doc = await docRef.get().toPromise();
      await docRef.set({...doc.data(), priority: i});
    });*/
  }


  drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousIndex, event.currentIndex);
    moveItemInArray(this.productBacklogsList, event.previousIndex, event.currentIndex);
    this.productBacklogsList = this.productBacklogsList.map((d,i) => {
      d.priority = i;
      return d;
    });
    this.showLoader = true;
    this.productBacklogsList.forEach(async (pro) => {
      const docRef = await this.productBacklogDetailsCollection.doc(pro.id);
      const doc = await docRef.get().toPromise();
      await docRef.set({...pro});
    });
    this.showLoader = false;
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
        await this.productBacklogDetailsCollection.doc(this.editProductBacklogId).set({
          ...productBacklogDetails,
          id: this.editProductBacklogId
        });
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
