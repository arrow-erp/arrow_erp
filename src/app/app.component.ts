import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  headerMenuData = [
    {label: 'DASHBOARD', id: 'dashboard', route: 'dashboard'},
    {label: 'STUDENT MANAGEMENT', id: 'studentsList', route: 'students-list'},
    {label: 'STAFF MANAGEMENT', id: 'facultiesList', route: 'faculties-list'},
    {label: 'COURSES MANAGEMENT', id: 'coursesList', route: 'course-list'},
    {label: 'BATCHES MANAGEMENT', id: 'batchesList', route: 'batches-list'},
    {label: 'FEES COLLECTION', id: 'feesCollection', route: 'fees-collection'},
    {label: 'ACCOUNT MAINTENANCE', id: 'accountMaintenance', route: 'account-maintenance'},
    {label: 'PRODUCT BACKLOG', id: 'productBacklog', route: 'product-backlog'},
    {label: 'Register Institution', id: 'registerInstitution', route: 'register-institution'},
  ];

  toggleMenu() {
    window.document.body.classList.toggle('nav-open');
  }
}
