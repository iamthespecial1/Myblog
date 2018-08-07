import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType, Response } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  isDev: any;
  constructor(private http: Http, private httpClient: HttpClient) {
    this.isDev = true;  // Change to false before deployment
  }

  registerUser(user) {
    let headers = new Headers();
    alert(user)
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/users/register', user, { headers: headers })
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/users/authenticate', user, { headers: headers })
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/users/profile', { headers: headers })
      .map(res => res.json());
  }
  getAllUser() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/users/usersList').map(res => res.json());


  }
  geteditable(username) {
    return this.http.get('http://localhost:8080/users/' + username)
      .map(res => res.json());
  }
  updateUser(updatedUser) {
    let username = updatedUser.username;
    console.log("chal be " + username);
    return this.http.put('http://localhost:8080/users/' + username, updatedUser)
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  sendData(data) {
    console.log("authservice  " + data.img);
    return this.http.post('http://localhost:8080/myblogs/postdata', data).map(res => res.json());
  }
  getData(){

    /* return this.http.get('http://localhost:8080/myblogs',{ responseType: ResponseContentType.Blob })
         .map((res: Response) => res.blob());
   }*/
    return this.http.get('http://localhost:8080/myblogs').map(res => res.json());

  }
  getThreeData(){

    /* return this.http.get('http://localhost:8080/myblogs',{ responseType: ResponseContentType.Blob })
         .map((res: Response) => res.blob());
   }*/
    return this.http.get('http://localhost:8080/myblogs/get').map(res => res.json());

  }
  getBlog(title){
      return this.http.get('http://localhost:8080/myblogs/'+title).map(res => res.json());
  }
  getCount(){
    return this.http.get('http://localhost:8080/users/count').map(res => res.json())
  }
 
}
