import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsListComponent } from './pages/students-list/students-list.component';
import {FacultiesListComponent} from './pages/faculties-list/faculties-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'students-list', pathMatch: 'full' },
  { path: 'students-list', component: StudentsListComponent },
  { path: 'faculties-list', component: FacultiesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
