import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(user: any) {
    return this.http.post<any>(this.URL + '/user/register', user);
  }

  loginUser(user: any) {
    return this.http.post<any>(this.URL + '/user/login', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/tasks']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getContacts(token: any) {
    const httpOptions = {
      headers: { Authorization: token },
    };
    return this.http.get<any>(this.URL + `/user/userContacts`, httpOptions);
  }

  getContactById(id :any,token: any) {
    const httpOptions = {
      headers: { Authorization: token },
    };
    return this.http.get<any>(this.URL + `/user/userContactById/${id}`, httpOptions);
  }

  addContact(Contact: any, token: any) {
    const httpOptions = {
      headers: { Authorization: token },
    };
    return this.http.post<any>(
      this.URL + `/user/addContact`,
      Contact,
      httpOptions
    );
  }

  deleteContact(id: any, token: any) {
    const httpOptions = {
      headers: { Authorization: token },
    };
    return this.http.delete<any>(
      this.URL + `/user/deleteContact/${id}`,
      httpOptions
    );
  }

  editContact(id: any, token: any, Contact: any) {
    const httpOptions = {
      headers: { Authorization: token },
    };
    return this.http.put<any>(
      this.URL + `/user/updateContact/${id}`,
      Contact,
      httpOptions
    );
  }
}
