import { Component,OnInit,LOCALE_ID ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CameraDialogService } from './../../utilitaires/camera-dialog/camera-dialog.service';
import { MembreDTO} from './../../interfaces/data';
import { CommonModule,registerLocaleData } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS,MAT_DATE_LOCALE } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { AppDateAdapter} from './../../utilitaires/mat-date-picker/adapter.service';
import { MY_DATE_FORMATS } from './../../utilitaires/mat-date-picker/format-date';
import localeFr from '@angular/common/locales/fr';
import { SignatureDialogueService } from './../../utilitaires/signature-dialogue/signature-dialogue.service';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { Codebar6MembreService } from './../../utilitaires/codebarmembre/codebar6.service';
import { NouveauMembreComponent } from '../nouveau-membre/nouveau-membre.component';
import { MembreDataService } from './../../services/membre-data.service';
registerLocaleData(localeFr);


@Component({
  selector: 'app-validation',
  standalone: true,
  imports: [CommonModule,MatOption,MatButtonModule,
    MatNativeDateModule,NgxBarcode6Module,NouveauMembreComponent,
  ],
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.css',
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: LOCALE_ID, useValue: 'fr-FR' }],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ValidationComponent  implements OnInit{
  
  membre:MembreDTO|null=null ;
  
  capturedPhotoUrl: string | undefined;
  signatureurl: string | undefined;

  constructor(
    public codebar6MembreService: Codebar6MembreService,
    private cameraDialogService:CameraDialogService,
    private signatureDialogueService:SignatureDialogueService,
    private membreDataService: MembreDataService) { }
    
    

      ngOnInit(): void {

        this.membreDataService.membre$.subscribe(membre => {
          this.membre = membre;
        });

        this.cameraDialogService.capturedPhotoUrl$.subscribe((capturedPhotoUrl) => {
          this.capturedPhotoUrl = capturedPhotoUrl;         
          }); 
      
        this.signatureDialogueService.signatureImage$.subscribe((signatureImage) => {
            this.signatureurl = signatureImage;     
            }); 

        console.log("forcer",this.membre);
      }
    }

  
  

