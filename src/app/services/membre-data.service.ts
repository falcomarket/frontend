import { Injectable } from '@angular/core';
import { MembreDTO } from '../interfaces/data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembreDataService {

  

    private membreSubject = new BehaviorSubject<MembreDTO | null>(null);
    membre$ = this.membreSubject.asObservable();
  
    constructor() { }
  
    setMembre(membre: MembreDTO) {
      this.membreSubject.next(membre);
    }
  
    getMembre(): MembreDTO | null {
      return this.membreSubject.value;
    }
  }


