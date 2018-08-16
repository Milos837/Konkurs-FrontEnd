import { Injectable } from '@angular/core';
import { Posting } from '../models/posting';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { Responsibilities } from '../models/responsibilities';
import { Requirements } from '../models/requirements';
import { Offering } from '../models/offering';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostingService {

  private postingUrl = environment.apiBaseUrl.concat('/postings/');

  constructor(private http: HttpClient) { }

  getAllPostings(): Observable<Posting[]> {
    return this.http.get<any>(this.postingUrl + "no-security/");
  }

  getPosting(id: number): Observable<Posting> {
    return this.http.get<any>(`${this.postingUrl}${id}/no-security/`);
  }

  getResponsibilitiesForPosting(id: number): Observable<Responsibilities[]> {
    return this.http.get<any>(`${this.postingUrl}${id}/responsibilities/no-security/`).pipe(delay(50));
  }

  getRequirementsForPosting(id: number): Observable<Requirements[]> {
    return this.http.get<any>(`${this.postingUrl}${id}/requirements/no-security/`).pipe(delay(75));;
  }

  getOfferingForPosting(id: number): Observable<Offering[]> {
    return this.http.get<any>(`${this.postingUrl}${id}/offering/no-security/`).pipe(delay(100));;
  }

}
