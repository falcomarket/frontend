import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraDialogService {
  private capturedPhotoUrlSource = new BehaviorSubject<string | undefined>(undefined);
  capturedPhotoUrl$ = this.capturedPhotoUrlSource.asObservable();
  setCapturedPhotoUrl(url: string) {
    this.capturedPhotoUrlSource.next(url);
  }
}
