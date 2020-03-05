import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { front_end_config } from './config';

@Injectable({
  providedIn: 'root'
})

export class EventApiService {
  
  baseUri:string = front_end_config.back_end_url;
  apiUri:string = this.baseUri+'/event';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Create
  createEvent(data): Observable<any> {
    let url = `${this.apiUri}`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all Events
  getEvents() {
    return this.http.get(`${this.apiUri}`);
  }

  // Get Event
  getEvent(id): Observable<any> {
    let url = `${this.apiUri}/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update Event
  updateEvent(id, data): Observable<any> {
    let url = `${this.apiUri}/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Update Event
  registerToEvent(id, data): Observable<any> {
    let url = `${this.apiUri}/register/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete Event
  deleteEvent(id): Observable<any> {
    let url = `${this.apiUri}/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }


  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}