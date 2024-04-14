import { Component,OnInit,LOCALE_ID,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CameraDialogService } from './../../utilitaires/camera-dialog/camera-dialog.service';
import { FormGroup} from '@angular/forms';
import { MembreDTO,StatutAdhesion,ChoixPlanAdhesion,MontantPlanAdhesion,AvantagesAdhesion} from './../../interfaces/data';
import { CommonModule } from '@angular/common';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelect, MatLabel } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTabGroup } from '@angular/material/tabs';

import jsPDF from 'jspdf';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS,MAT_DATE_LOCALE } from '@angular/material/core';
import { AppDateAdapter} from './../../utilitaires/mat-date-picker/adapter.service';
import { MY_DATE_FORMATS} from './../../utilitaires/mat-date-picker/format-date';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import html2canvas from 'html2canvas';

import { SignatureDialogueService } from './../../utilitaires/signature-dialogue/signature-dialogue.service';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { Codebar6MembreService } from './../../utilitaires/codebarmembre/codebar6.service';
import { MembreDataService } from './../../services/membre-data.service';

registerLocaleData(localeFr);

@Component({
  selector: 'app-impression',
  standalone: true,
  imports: [CommonModule,MatIconModule,
    MatCardModule,MatInput,MatOption,ReactiveFormsModule,MatMomentDateModule,
    MatSelect,MatLabel,MatTabsModule,MatTabGroup,NgbModule,
    MatButtonModule,NgxBarcode6Module
    
  ],
  templateUrl: './impression.component.html',
  styleUrl: './impression.component.css',
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: LOCALE_ID, useValue: 'fr-FR' }],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImpressionComponent  implements OnInit{
  numberOfPages=2;
  entreprise ='MegaStore';
  capturedPhotoUrl: string | undefined;
  signatureurl: string | undefined;
  formspaiements!: FormGroup;
  membre:MembreDTO|null=null ;

  statutAdhesionValues = Object.values(StatutAdhesion);
  choixPlanAdhesionValues = Object.values(ChoixPlanAdhesion);
  avantagesAdhesionValues = Object.values(AvantagesAdhesion);

  typeAdhesion='';
  montantAdhesion='';
  
  choixPlanAdhesion = ChoixPlanAdhesion;
  montantPlanAdhesion = MontantPlanAdhesion;

  constructor(private cameraDialogService:CameraDialogService,
    private signatureDialogueService:SignatureDialogueService,
    public codebar6MembreService: Codebar6MembreService,
    private membreDataService: MembreDataService) {
      
  }

  ngOnInit(): void {

    this.membreDataService.membre$.subscribe(membre => {
      this.membre = membre;
    });
    this.membreDataService.membre$.subscribe(membre => {
      this.membre = membre;
    });
    
    this.cameraDialogService.capturedPhotoUrl$.subscribe((capturedPhotoUrl) => {
      this.capturedPhotoUrl = capturedPhotoUrl;         
      }); 
  
    this.signatureDialogueService.signatureImage$.subscribe((signatureImage) => {
        this.signatureurl = signatureImage;     
        }); 
  }
  generatePDF(): void {
    const doc = new jsPDF('p', 'mm', 'a4'); // Portrait, millimètres, format A4
  
    const element = document.getElementById('contratAdhesion');
    //const element = this.renderer.selectRootElement('#contratAdhesion');
    // Vérifier si l'élément existe
    if (element) {
      html2canvas(element, { scale: 2, scrollY: -window.scrollY }).then((canvas) => { 
        const imgData = canvas.toDataURL('image/png');
  
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
  
        const canvasHeight = canvas.height;
        const canvasWidth = canvas.width;
  
        const parts = this.numberOfPages;
  
        const partHeight = canvasHeight / parts;
  
        for (let i = 0; i < parts; i++) {
          const startY = i * partHeight;
          const ctx = canvas.getContext('2d');
          const partImgData = ctx?.getImageData(0, startY, canvasWidth, partHeight);
  
          const partCanvas = document.createElement('canvas');
          partCanvas.width = canvasWidth;
          partCanvas.height = partHeight;
          const partCtx = partCanvas.getContext('2d');
          partCtx?.putImageData(partImgData as ImageData, 0, 0);
  
          const dataUrl = partCanvas.toDataURL('image/png');
          doc.addImage(dataUrl, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);
  
          //console.log(`Page ${i + 1}: x = 10, y = 10, width = ${pdfWidth - 20}, height = ${pdfHeight - 20}`);
  
          if (i < parts - 1) {
            doc.addPage();
          }
        }
  
        doc.save('contrate#' + this.membre?.codeMembre + '.pdf');
      });
    } else {
      console.error("L'élément avec l'ID 'contrat' n'a pas été trouvé.");
    }
  }
  
  
  generateCarteAdhesionPDF(): void {
    const numberOfPages=1;
    const doc = new jsPDF('p', 'mm', 'a6'); // Portrait, millimètres, format A4
  
    const element = document.getElementById('carteAdhesion');
    //const element = this.renderer.selectRootElement('carteAdhesion');
  
    // Vérifier si l'élément existe
    if (element) {
      html2canvas(element, { scale: 2, scrollY: -window.scrollY }).then((canvas) => { 
        const imgData = canvas.toDataURL('image/png');
  
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
  
        const canvasHeight = canvas.height;
        const canvasWidth = canvas.width;
  
        const parts = numberOfPages;
  
        const partHeight = canvasHeight / parts;
  
        for (let i = 0; i < parts; i++) {
          const startY = i * partHeight;
          const ctx = canvas.getContext('2d');
          const partImgData = ctx?.getImageData(0, startY, canvasWidth, partHeight);
  
          const partCanvas = document.createElement('canvas');
          
          

          partCanvas.width = canvasWidth;
          partCanvas.height = partHeight;
          const partCtx = partCanvas.getContext('2d');
          partCtx?.putImageData(partImgData as ImageData, 0, 0);
  
          const dataUrl = partCanvas.toDataURL('image/png');
          
          doc.addImage(dataUrl, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);
  
  
          if (i < parts - 1) {
            doc.addPage();
          }
        }
       

        
        doc.save('carte#' + this.membre?.codeMembre + '.pdf');
        

      });
    } else {
      console.error("L'élément avec l'ID 'carte' n'a pas été trouvé.");
    }
  }

  onQuiter(): void {

  };
}
