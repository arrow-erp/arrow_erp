import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  headerMenuData = [
    {label: 'Students List', id: 'studentsList', route: 'students-list'},
    {label: 'Faculties List', id: 'facultiesList', route: 'faculties-list'},
    /*{label: 'Courses List', id: 'coursesList', route: ''},
    {label: 'Batches List', id: 'batchesList', route: ''}*/
  ];
}
