import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsListComponent } from './pages/students-list/students-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'students-list', pathMatch: 'full' },
  { path: 'students-list', component: StudentsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
