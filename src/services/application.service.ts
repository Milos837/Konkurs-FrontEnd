import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Citizenship } from '../models/citizenship';
import { Language } from '../models/language';
import { ApplicationDTO } from '../models/applicationdto';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private applicationsUrl = environment.apiBaseUrl.concat('/applications/');

  constructor(private http: HttpClient) { }

  getCitizenships(): Observable<Citizenship[]> {
    return this.http.get<any>(this.applicationsUrl + "citizenships/no-security/");
  }

  getLanguages(): Observable<Language[]> {
    return this.http.get<any>(this.applicationsUrl + "languages/no-security/");
  }

  sendApplicaiton(newApplication: ApplicationDTO, postingId: number): Observable<ApplicationDTO> {
    return this.http.post<any>(`${this.applicationsUrl}postings/${postingId}/no-security/`, newApplication);
  }
}
