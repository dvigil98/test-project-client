import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:8000/api/auth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {

    const headersNoToken = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.baseUrl}/login`, { email: email, password: password }, { headers: headersNoToken });
  }

  logout(token: string): Observable<any> {

    const headersWithToken = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.baseUrl}/logout`, { headers: headersWithToken });
  }

  setUser(user: any): any {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    let user: any = localStorage.getItem('user');
    if (!user)
      throw 'no user found';
    return user;
  }

  deleteUser(): any {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('user') != undefined) {
      return true;
    }
    return false;
  }
}
