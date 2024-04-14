import { Component, ViewChild, ElementRef, AfterViewInit, EventEmitter,Output,   } from '@angular/core';
import SignaturePad from 'signature_pad';
@Component({
  selector: 'app-signature',
  standalone: true,
  imports: [],
  templateUrl: './signature.component.html',
  styleUrl: './signature.component.css'
})
export class SignatureComponent implements AfterViewInit{
  @Output() signatureDone = new EventEmitter<string>();
  @ViewChild('signatureCanvas') signatureCanvas: ElementRef | undefined;

  private signaturePad: any;

  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signatureCanvas?.nativeElement);
    this.signaturePad.penColor = 'black';
  }

  clear() {
    this.signaturePad.clear();
  }

  saveSignature() {
    const signatureImage = this.signaturePad.toDataURL();
    this.signatureDone.emit(signatureImage);
  }
}



