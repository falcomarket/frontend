import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Codebar6MembreService {


  private _codeMembreDataValue: BehaviorSubject<string> = new BehaviorSubject<string>('');

 

  set codeMembreDataValue(value: string) {
    this._codeMembreDataValue.next(value);
  }

  get codeMembreDataValue$() {
    return this._codeMembreDataValue.asObservable();
  }




}

