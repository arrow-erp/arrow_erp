import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {BatchDetailsInterface} from '../../interfaces/batch-details.interface';
import {Observable} from 'rxjs';

@Component({
  selector: 'arrow-batches-allocation',
  templateUrl: './batches-allocation.component.html',
  styleUrls: ['./batches-allocation.component.scss']
})
export class BatchesAllocationComponent implements OnInit {

  @Input() selectedBatch = [];
  @Input() totalFee = 0;
  @Output() totalFeeChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() selectedBatchChange: EventEmitter<BatchDetailsInterface[]> = new EventEmitter<BatchDetailsInterface[]>();

  private batchDetailsCollection: AngularFirestoreCollection<BatchDetailsInterface>;
  batchList: Observable<BatchDetailsInterface[]>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.batchDetailsCollection = afs.collection<BatchDetailsInterface>('batchList');
    this.batchList = this.batchDetailsCollection.valueChanges();
  }

  toggleSelection(batch) {
    const idx = this.selectedBatch.map(d => d.id).indexOf(batch.id);
    if (idx !== -1) {
      this.selectedBatch.splice(idx, 1);
    }
    else {
      this.selectedBatch.push(batch);
    }
    this.totalFee = this.getTotalFees();
    this.totalFeeChange.emit(this.totalFee);
  }

  isSelected(batchId) {
    return this.selectedBatch.map(d => d.id).includes(batchId);
  }

  ngOnInit(): void {
  }

  getTotalFees() {
    return this.selectedBatch.map(d => d.fees).reduce((a, b) => a + b, 0);
  }
}
