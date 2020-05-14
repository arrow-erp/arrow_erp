import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StudentsListComponent} from './pages/students-list/students-list.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from 'src/environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import {AccordionModule} from 'ngx-bootstrap';
import { FacultiesListComponent } from './pages/faculties-list/faculties-list.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import {BatchesListComponent} from './pages/batches-list/batches-list.component';
import {DateSuffixPipe} from './components/date-suffix-pipe/date-suffix.pipe';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BatchesAllocationComponent } from './components/batches-allocation/batches-allocation.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HamburgerAnimationComponent } from './components/hamburger-animation/hamburger-animation.component';
import { ProductBacklogComponent } from './pages/product-backlog/product-backlog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudentsListComponent,
    FacultiesListComponent,
    CourseListComponent,
    BatchesListComponent,
    DateSuffixPipe,
    BatchesAllocationComponent,
    SideBarComponent,
    HamburgerAnimationComponent,
    ProductBacklogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
