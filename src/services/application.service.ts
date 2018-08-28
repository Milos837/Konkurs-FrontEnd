import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Citizenship } from '../models/citizenship';
import { Language } from '../models/language';
import { ApplicationDTO } from '../models/applicationdto';
import { AuthService } from './auth.service';
import { Application } from '../models/application';
import { Education } from '../models/education';
import { delay } from 'rxjs/operators';
import { Certificate } from '../models/certificate';
import { EmailObject } from '../models/emailobject';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private applicationsUrl = environment.apiBaseUrl.concat('/applications/');

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCitizenships(): Observable<Citizenship[]> {
    return this.http.get<any>(this.applicationsUrl + 'citizenships/no-security/');
  }

  getLanguages(): Observable<Language[]> {
    return this.http.get<any>(this.applicationsUrl + 'languages/no-security/');
  }

  sendApplicaiton(newApplication: ApplicationDTO, postingId: number): Observable<Application> {
    return this.http.post<any>(`${this.applicationsUrl}postings/${postingId}/no-security/`, newApplication);
  }

  getApplicationsForPosting(postingId: number): Observable<Application[]> {
    return this.http.get<any>(`${this.applicationsUrl}posting/${postingId}`, {headers: this.authService.getHeaders()});
  }

  getApplication(appId: number): Observable<Application> {
    return this.http.get<any>(`${this.applicationsUrl}${appId}`, {headers: this.authService.getHeaders()});
  }

  deleteApplication(appId: number): Observable<Application> {
    return this.http.delete<any>(`${this.applicationsUrl}${appId}`, {headers: this.authService.getHeaders()});
  }

  getLanguagesForApplication(appId: number): Observable<Language[]> {
    return this.http.get<any>(`${this.applicationsUrl}${appId}/languages/`, {headers: this.authService.getHeaders()}).pipe(delay(50));
  }

  getEducationsForApplication(appId: number): Observable<Education[]> {
    return this.http.get<any>(`${this.applicationsUrl}${appId}/educations/`, {headers: this.authService.getHeaders()}).pipe(delay(75));
  }

  getCertificatesForApplication(appId: number): Observable<Certificate[]> {
    return this.http.get<any>(`${this.applicationsUrl}${appId}/certificates/`, {headers: this.authService.getHeaders()}).pipe(delay(100));
  }

  uploadCv(file: File, appId: number): Observable<any> {
    const fd = new FormData();
    fd.append('file', file, file.name);
    return this.http.post<any>(`${this.applicationsUrl}${appId}/uploadCV/no-security/`, fd);
  }

  uploadMl(file: File, appId: number): Observable<any> {
    const fd = new FormData();
    fd.append('file', file, file.name);
    return this.http.post<any>(`${this.applicationsUrl}${appId}/uploadML/no-security/`, fd);
  }

  uploadCL(file: File, appId: number): Observable<any> {
    const fd = new FormData();
    fd.append('file', file, file.name);
    return this.http.post<any>(`${this.applicationsUrl}${appId}/uploadCL/no-security/`, fd);
  }

  downloadCv(file: string, appId: number) {
    const body = { filename: file };

    return this.http.post(`${this.applicationsUrl}${appId}/downloadCV/`, body, {
      responseType: 'blob',
      headers: this.authService.getHeaders()
    });
  }

  downloadMl(file: string, appId: number) {
    const body = { filename: file };
    return this.http.post(`${this.applicationsUrl}${appId}/downloadML/`, body, {
      responseType: 'blob',
      headers: this.authService.getHeaders()
    });
  }

  downloadCl(file: string, appId: number) {
    const body = { filename: file };

    return this.http.post(`${this.applicationsUrl}${appId}/downloadCL/`, body, {
      responseType: 'blob',
      headers: this.authService.getHeaders()
    });
  }

  sendEmail(email: EmailObject): Observable<EmailObject> {
    return this.http.post<any>(this.applicationsUrl + 'sendEmail/', email, {headers: this.authService.getHeaders()});
  }

}
