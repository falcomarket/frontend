import { Injectable } from '@angular/core';
//import {HttpClient, HttpParams, HttpErrorResponse} from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http';
import { MembreDTO} from '../interfaces/data';
import { PageResponse } from '../interfaces/data';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private memberDataSubject: BehaviorSubject<MembreDTO | null> = new BehaviorSubject<MembreDTO | null>(null);
  public memberData$: Observable<MembreDTO | null> = this.memberDataSubject.asObservable();


  private host:string="http://localhost:8080/datastore";
  
  private handleError(error: HttpErrorResponse) {
    // Log the error in your preferred way, e.g., console.error()
    console.error('An error occurred:', error);
  
    // Return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  
  constructor(private http:HttpClient) { }
  
  getPagedMembres(page: number, pageSize: number, sortField: string, sortDirection: string): Observable<PageResponse<MembreDTO>> {
    const url = `${this.host}/membres?page=${page}&size=${pageSize}&sortField=${sortField}&sortDirection=${sortDirection}`;
    return this.http.get<PageResponse<MembreDTO>>(url).pipe(
      catchError(this.handleError));
  }

  
  createMembre(membre: any): Observable<any> {
    return this.http.post(this.host+'/membres', membre);
  }

  setMemberData(data: MembreDTO) {
    this.memberDataSubject.next(data);
  }
}





  