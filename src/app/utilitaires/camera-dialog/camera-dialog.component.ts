import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogContainer, MatDialogRef } from '@angular/material/dialog';
import { CameraDialogService } from '../../utilitaires/camera-dialog/camera-dialog.service';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
declare var $: any;

@Component({
  selector: 'app-camera-dialog',
  standalone: true,
  imports: [MatDialogContainer,MatDialogActions,MatDialogContent,],
  templateUrl: './camera-dialog.component.html',
  styleUrl: './camera-dialog.component.css'
})

export class CameraDialogComponent implements OnInit {
  

  @ViewChild('videoElement') videoElement?: ElementRef;
 
  largeurPhoto: number = 180; 
  hauteurPhoto: number = 200; 
  mediaStream?: MediaStream;
  
 
 
  constructor(
    public dialogCam: MatDialogRef<CameraDialogComponent>,
    private cameraDialogService: CameraDialogService
  ) { }


  ngOnInit(): void {
    
  }




  
  
  activerCamera() {
  
    const video = this.videoElement?.nativeElement;
  
    if (video) {
      const constraints: MediaStreamConstraints = {
        video: {
          width: this.largeurPhoto,
          height: this.hauteurPhoto,  
          facingMode: 'environment'  
        }
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          video.srcObject = stream;
        })
        .catch((error) => {
          console.error('Erreur lors de l\'accès à la caméra :', error);
        });
    }
  }
    
  capturerPhoto() {
    
    if (this.videoElement && this.videoElement.nativeElement) {
      const video = this.videoElement.nativeElement;
      const canvas = document.createElement('canvas');
      canvas.width = this.largeurPhoto; 
      canvas.height = this.hauteurPhoto; 
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, this.largeurPhoto, this.hauteurPhoto);
        const capturedImageBase64 = canvas.toDataURL('image/jpeg');
        this.cameraDialogService.setCapturedPhotoUrl(capturedImageBase64);
        
      }
      }
    }
    
  


  fermerCamera() {
  
  if (this.videoElement && this.videoElement.nativeElement) {
    const video = this.videoElement.nativeElement;
    if (video.srcObject) {
      const stream = video.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      video.srcObject = null;
    }
  }
}
  
  fermerFenetreModale() {
    this.fermerCamera();
    this.dialogCam.close();
  } 
}