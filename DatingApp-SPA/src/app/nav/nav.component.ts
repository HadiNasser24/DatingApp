import { Component, OnInit } from '@angular/core';
import { AuthService } from '../-services/auth.service';
import { AlertifyService } from '../-services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  photoUrl: string;
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe( photoUrl => { // we have to subscribe to it since it is a type of observable
      this.photoUrl = photoUrl;
    });
  }

  login() {
    this.authService.login(this.model).subscribe(next => { // we should subscribe for observables
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error(error);
    }, () => { // on Complete
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
   return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }

}
