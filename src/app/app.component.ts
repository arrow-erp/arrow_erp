import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 headerMenuData =  [
    { label: 'Students List', id: 'studentsList' },
    { label: 'Faculties List', id: 'facultiesList' },
    { label: 'Courses List', id: 'coursesList' },
    { label: 'Batches List', id: 'batchesList' }
  ];
}
