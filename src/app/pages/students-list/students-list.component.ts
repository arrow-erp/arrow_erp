import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'arrow-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent {

  data = [
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
    { email: 'asdf@asdfas.com', photo: './assets/avatar.jpg', displayName: 'Rave R', id: '123', phoneNumber: '987654321' },
  ];


  constructor(public auth: AngularFireAuth) {
    this.auth.user.subscribe(data => {
      console.log(data);
    });
  }
  login() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }

}

