import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = environment.apiBaseUrl + '/auth/';
  public role: string;

  constructor(private httpClient: HttpClient) {
    this.role = localStorage.getItem('role');
  }

  login(username: string, password: string): Observable<string> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Authorization', 'Basic ' + btoa(`${username}:${password}`));

    return this.httpClient.post<any>(this.authUrl + 'login', {}, { headers: httpHeaders });
  }

  logout() {
    localStorage.removeItem('credentials');
    localStorage.removeItem('role');
    this.role = null;

  }

  isLoggedIn() {
    if (localStorage.getItem('role') == null) {
      return false;
    }
    return true;
  }

  saveCredentials(username: string, password: string, role: string) {
    localStorage.setItem('credentials', btoa(`${username}:${password}`));
    localStorage.setItem('role', role);
    this.role = role;
  }

  getHeaders(): HttpHeaders {
    let httpHeaders = new HttpHeaders();

    const credentials = localStorage.getItem('credentials');
    if (credentials) {
      httpHeaders = httpHeaders.append('Content-Type', 'application/json');
      httpHeaders = httpHeaders.append('Authorization', 'Basic ' + credentials);
    }

    return httpHeaders;
  }
}
