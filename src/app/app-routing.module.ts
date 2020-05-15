import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StudentsListComponent} from './pages/students-list/students-list.component';
import {FacultiesListComponent} from './pages/faculties-list/faculties-list.component';
import {CourseListComponent} from './pages/course-list/course-list.component';
import {BatchesListComponent} from './pages/batches-list/batches-list.component';
import {ProductBacklogComponent} from './pages/product-backlog/product-backlog.component';
import {RegisterInstitutionComponent} from './pages/register-institution/register-institution.component';


const routes: Routes = [
  {path: '', redirectTo: 'register-institution', pathMatch: 'full'},
  {path: 'students-list', component: StudentsListComponent},
  {path: 'faculties-list', component: FacultiesListComponent},
  {path: 'course-list', component: CourseListComponent},
  {path: 'batches-list', component: BatchesListComponent},
  {path: 'product-backlog', component: ProductBacklogComponent},
  {path: 'register-institution', component: RegisterInstitutionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
