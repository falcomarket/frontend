
import { Component, Output, EventEmitter,ViewChild, AfterViewInit,ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import SignaturePad from 'signature_pad';
import { SignatureDialogueService } from './signature-dialogue.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-signature-dialogue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signature-dialogue.component.html',
  styleUrl: './signature-dialogue.component.css'
})
export class SignatureDialogueComponent {
  //signatureImage: string | null = null;
  signaturePad?: SignaturePad;
  
 // @ViewChild('signaturePadCanvas') signaturePadCanvas?: ElementRef;
  
 @ViewChild('signaturePadCanvas') signaturePadCanvas?: ElementRef;

  constructor(public dialogRef: MatDialogRef<SignatureDialogueComponent>,
    private signatureDialogueService: SignatureDialogueService ) {}

  ngAfterViewInit() {
    
    //this.signaturePad = new SignaturePad(this.signaturePadCanvas.nativeElement);
    this.signaturePad = new SignaturePad(this.signaturePadCanvas?.nativeElement);
  }
  

  clearSignature() {
    this.signaturePad?.clear();
  }

  
 

  


  saveSignature() {
    const signatureData = this.signaturePad?.toDataURL();
    //console.log(signatureData);  // Affiche l'image de la signature dans la console
    
    if (signatureData) {
      this.signatureDialogueService.setSignatureImage(signatureData); // Mettre à jour le service ici
      this.dialogRef.close(signatureData);  // Utilisez signatureImage ici
    } else {
      console.error('La signature est undefined');
    }
}



}