import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseurl = environment.apiUrl + 'Auth/';
jwtHelper = new JwtHelperService();
decodedToken: any;
currentUser: User;
photoUrl = new BehaviorSubject<string>('../../assets/user.jpg'); // default value
currentPhotoUrl = this.photoUrl.asObservable();

constructor(private http: HttpClient) { }

changeMemberPhoto(photoUrl: string) {
  this.photoUrl.next(photoUrl);
}

login(model: any) {
return this.http.post(this.baseurl + 'login', model)
                .pipe(
                  map( (response: any) => {  // this will return a token {"token": "ctcdthvcghfhth......."}
                    const user = response;
                    if (user) {
                      localStorage.setItem('token', user.token);
                      localStorage.setItem('User', JSON.stringify(user.user)); // turns object to string
                      this.decodedToken = this.jwtHelper.decodeToken(user.token);
                      this.currentUser = user.user;
                      this.changeMemberPhoto(this.currentUser.photoUrl);
                    }
                  })
                );
}

register(model: any) {
  return this.http.post(this.baseurl + 'register', model);
  }


loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token); // return true if not expired
  }

}
