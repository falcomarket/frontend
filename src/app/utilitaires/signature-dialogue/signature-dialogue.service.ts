import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignatureDialogueService {

  constructor() { }

  private signatureImageSource = new BehaviorSubject<string | undefined>(undefined);
  signatureImage$ = this.signatureImageSource.asObservable();

  setSignatureImage(image: string) {
    this.signatureImageSource.next(image);
  }


}
