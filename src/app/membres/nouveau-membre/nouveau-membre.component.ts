import { Component,OnInit,ViewChild,LOCALE_ID ,ElementRef ,CUSTOM_ELEMENTS_SCHEMA,AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTabGroup } from '@angular/material/tabs';

import jsPDF from 'jspdf';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS,MAT_DATE_LOCALE } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MY_DATE_FORMATS } from './../../utilitaires/mat-date-picker/format-date';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import html2canvas from 'html2canvas';
import { FormGroup } from '@angular/forms';  

import { NgxBarcode6Module } from 'ngx-barcode6';
import { Codebar6MembreService } from './../../utilitaires/codebarmembre/codebar6.service';
import { delay } from 'rxjs/operators';
import { FormsAdhesionComponent } from '../forms-adhesion/forms-adhesion.component';
import { FormsPersoComponent } from '../forms-perso/forms-perso.component';
import { FormsPaiementComponent } from '../forms-paiement/forms-paiement.component';
import { ValidationComponent } from '../validation/validation.component';
import { ImpressionComponent } from '../impression/impression.component';
import { MembreDataService } from '../../services/membre-data.service';
import { CameraDialogComponent } from './../../utilitaires/camera-dialog/camera-dialog.component';
import { CameraDialogService } from './../../utilitaires/camera-dialog/camera-dialog.service';
import { DataService } from './../../services/data.service';
import { MembreDTO,ChoixPlanAdhesion,MontantPlanAdhesion} from './../../interfaces/data';
import { ErrorDialogComponent } from './../../utilitaires/error-dialog/error-dialog.component';
import { SignatureDialogueComponent } from './../../utilitaires/signature-dialogue/signature-dialogue.component';
import { SignatureDialogueService } from './../../utilitaires/signature-dialogue/signature-dialogue.service';

registerLocaleData(localeFr);


@Component({
  selector: 'app-nouveau-membre',
            
  standalone: true,
  imports: [CommonModule,MatIconModule,MatCardModule,ReactiveFormsModule,
            MatTabsModule,MatTabGroup,NgbModule,MatButtonModule,
            MatNativeDateModule,NgxBarcode6Module,
            FormsAdhesionComponent,FormsPersoComponent,
            FormsPaiementComponent,ValidationComponent,ImpressionComponent,
            
            
          ],
  templateUrl: './nouveau-membre.component.html',
  styleUrl: './nouveau-membre.component.css',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: LOCALE_ID, useValue: 'fr-FR' }],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class NouveauMembreComponent implements AfterViewInit,OnInit {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChild('barcode', { static: false }) barcode?: ElementRef;
  @ViewChild(FormsPersoComponent) formsPersoComponent!: FormsPersoComponent;
  @ViewChild(FormsAdhesionComponent) formsAdhesionComponent!: FormsAdhesionComponent;
  @ViewChild(FormsPaiementComponent) formsPaiementComponent!: FormsPaiementComponent;
  
  
  entreprise ='MegaStore'
  numberOfPages = 2;
  formspersonnel!: FormGroup;
  formsPerso!: FormGroup;
  
  formsadhesion!: FormGroup;
  formsAdhesion!: FormGroup;
  
  formspaiements!: FormGroup;
  formsPaiements!: FormGroup;

  
  choixPlanAdhesionValues = Object.values(ChoixPlanAdhesion);
  choixMontantAdhesionValues = Object.values(MontantPlanAdhesion);

  typeAdhesion = '';
  montantAdhesion ='';
  accepterConfidentialite='false';
  generatedCode?: string;
  barcodeUrl?: string =" ";
  vcodeMembre?: '1234567890' ;
 
  
  
    


tab1Disabled: boolean = false;
tab2Disabled: boolean = false;
tab3Disabled: boolean = false;
tab4Disabled: boolean = false;
tab5Disabled: boolean = false;
tab6Disabled: boolean = false;

capturedPhotoUrl: string | undefined;
signatureurl: string | undefined;


  
nmembre:MembreDTO|null=null ; 
membre:MembreDTO|null=null ;
  constructor(private membreService: DataService,
              private cameraDialogService:CameraDialogService,
              private signatureDialogueService:SignatureDialogueService,
              public codebar6MembreService: Codebar6MembreService,    
              private dialog: MatDialog,private erreurdialog: MatDialog,
              private membreDataService:MembreDataService) {  }


ngOnInit(): void {

  this.cameraDialogService.capturedPhotoUrl$.subscribe((capturedPhotoUrl) => {
    this.capturedPhotoUrl = capturedPhotoUrl;         
    }); 

  this.signatureDialogueService.signatureImage$.subscribe((signatureImage) => {
      this.signatureurl = signatureImage;     
      }); 

  this.membreDataService.membre$.subscribe(membre => {
        this.membre = membre;
  });
  
  
}
    ngAfterViewInit() {
      this.formsPerso = this.formsPersoComponent.formspersonnel;
      
      this.formsAdhesion = this.formsAdhesionComponent.formsadhesion;
      
      this.formsPaiements = this.formsPaiementComponent.formspaiements;
      

    }

    onSubmitFormPerso() {
      const formData = this.formsPerso.value;
  
      
      if (this.formsPerso.valid) {
        if (formData.accepterConfidentialite) { 
          this.saveMembre().then(() => {
            this.tab1Disabled = true;
            this.tab2Disabled = false;
            this.tabGroup.selectedIndex = 1;
          });
        } else {
          const dialogRef = this.erreurdialog.open(ErrorDialogComponent, {
            data: 'Veuillez accepter la politique de confidentialité',
          });
        }
      } else {
        const dialogRef = this.erreurdialog.open(ErrorDialogComponent, {
          data: 'Veuillez corriger les erreurs dans le formulaire.',
        });
      }
    }   
    
    onSubmitFormAdhesison() {
      console.log('log1',this.formsadhesion)

      if (this.formsAdhesion.valid) {
        this.saveMembre().then(() => {
         this.tab2Disabled = true;
         this.tab3Disabled = false;
         this.tabGroup.selectedIndex = 2;
        });
     }else {
       const dialogRef = this.erreurdialog.open(ErrorDialogComponent, {
         data: 'Veuillez corriger les erreurs dans le formulaire.',
       });
     }
    
    }   
    onSubmitFormPaiement() {
    if (this.formsPaiements.valid) {

      this.saveMembre().then(() => {
        this.tab3Disabled = true;
        this.tab4Disabled = false;
        this.tabGroup.selectedIndex = 3;
      });
    }else {
      const dialogRef = this.erreurdialog.open(ErrorDialogComponent, {
        data: 'Veuillez corriger les erreurs dans le formulaire.',
      });
    }
  }

  onCancelFormPaiement():void {
    
  }
  onCancelFormPerso():void {
    //this.formspersonnel.reset();    
    this.capturedPhotoUrl=''; 
  }
  onCancelFormContrat():void{   
    this.typeAdhesion='';
    this.montantAdhesion='';
}
   
  onCancelProcess(): void{

    this.formspersonnel.reset();    
    this.formsadhesion.reset();
    this.formspaiements.reset();
    this.tab2Disabled = true;
    this.tab3Disabled = true;
    this.tab4Disabled = true;
    this.tab5Disabled = true;
    this.tab6Disabled = true;
    this.tab1Disabled = false;
    this.tabGroup.selectedIndex = 0;
    this.capturedPhotoUrl=''; 
  }
  onCorrigerSaveGlobal():void{
    this.tab4Disabled = true;
    this.tab1Disabled = false;
    this.tabGroup.selectedIndex = 0;
  }
  saveMembre(): Promise<void> {
      return new Promise<void>((resolve, reject) => {
    
      const codeMembre = Math.floor(10000 + Math.random() * 90000);
      const formData1 = this.formsPerso.value;
      const formData2 = this.formsAdhesion.value;
      const formData3 = this.formsPaiements.value;
      
  
      
      this.membre = {
        codeMembre:  this.typeAdhesion.substring(0, 3) + this.generateRandomCode(),
        nom: formData1.nom.toUpperCase(),
        prenom: formData1.prenom.toUpperCase(),
        dateNaissance: this.formatDate(formData1.dateNaissance),
        genreMembre: formData1.genreMembre.toUpperCase(),
        email: formData1.email.toLowerCase(),
        numeroTelephone: formData1.numeroTelephone,
        adressePhysique: formData1.adressePhysique.toUpperCase(),
        codePostalMembre: formData1.codePostalMembre.toUpperCase(),
        paysMembre: formData1.paysMembre.toUpperCase(),
        villeMembre: formData1.villeMembre.toUpperCase(),
        compteFacebook: formData1.compteFacebook.toLowerCase(),
        compteInstagram: formData1.compteInstagram.toLowerCase(),
        compteGoogle: formData1.compteGoogle.toLowerCase(),
        pieceIdentite:formData1.pieceIdentite.toUpperCase(),
        numPieceIdentite:formData1.numPieceIdentite.toUpperCase(),
        dateDelivrePiece:this.formatDate(formData1.dateDelivrePiece),
        dateExpirePiece:this.formatDate(formData1.dateExpirePiece),
        accepterConfidentialite:this.accepterConfidentialite,
        
        typeAdhesion:formData2.typeAdhesion.toUpperCase(),
        montantAdhesion:formData2.montantAdhesion,
        dateDebutAdhesion:this.formatDate(formData2.dateDebutAdhesion),
        
        dateFinAdhesion:this.formatDate(formData2.dateFinAdhesion),
        statutAdhesion:formData2.statutAdhesion.toUpperCase(),
    
        nomTitulaireCarteCredit:formData3.nomTitulaireCarteCredit.toUpperCase(),
        numeroCarteCredit:formData3.numeroCarteCredit,
        moisExpirationCarteCredit:formData3.moisExpirationCarteCredit.toString(),
        anneeExpirationCarteCredit:formData3.anneeExpirationCarteCredit.toString(),
        codeSecuriteCarteCredit:formData3.codeSecuriteCarteCredit.toString(),
  
  
        photourl: this.capturedPhotoUrl,
        signatureurl: this.signatureurl,
  
      };
      
      this.membreDataService.setMembre(this.membre!);
      this.nmembre = this.membreDataService.getMembre();
      console.log(this.membre)
      resolve();
    })};
  
    onSaveGlobal(): void {
  
      this.saveMembre();  
      this.generateBarcode(); 
      this.membreService.createMembre(this.membre).subscribe((membreResponse: any) => {
      
      
      
      this.tab5Disabled = false;
      this.tab4Disabled = true;
      this.tabGroup.selectedIndex = 4;
      //this.capturedPhotoUrl=''; 
      //this.initForm();
      });    
    } 
  
    onQuiter(): void {
      this.tab1Disabled = true;
      this.tab2Disabled = true;
      this.tab3Disabled = true;
      this.tab4Disabled = true;
      this.tab5Disabled = true;
      this.tab6Disabled = false;
      this.tabGroup.selectedIndex = 5;
    };


 

  openPhotoDialog() {
    
  
    const dialogRef = this.dialog.open(CameraDialogComponent, {
      width: '500px', 
      height: '500px',
    });
  
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        
      }
    });
    
  }

  

getFutureDate(months: number, startDate: Date = new Date()): string {
  const futureDate = new Date(startDate.setMonth(startDate.getMonth() + months));
  return futureDate.toISOString().split('T')[0];  // Convertir la date en format 'yyyy-mm-dd'
}
/*onDateChange(event: any): void {
  const startDate = new Date(event.value);
  this.formsadhesion.controls['dateFinAdhesion'].setValue(this.getFutureDate(12, startDate));
  
}*/

onDateChange(event: MatDatepickerInputEvent<any>): void {
    
 
}

formatDate(date: Date): string {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Les mois sont 0-indexés
  const year = date.getFullYear();
  
  const formattedDate = `${year}-${month}-${day}`;
  //console.log('Formatted date inside formatDate:', formattedDate);  // Vérifiez la date formatée
  return formattedDate;
}

generateRandomCode(): string {
  let code = '';
  for (let i = 0; i < 7; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }
  return code;
}

generateBarcode(): void {
    const codeMembre = this.membre?.codeMembre;
    console.log("code:", codeMembre);
    if (codeMembre) {
      this.codebar6MembreService.codeMembreDataValue = codeMembre.toString();
      this.codebar6MembreService.codeMembreDataValue$.pipe(delay(0)).subscribe(value => {
      });
    }

}




openSignatureDialog(): void {
  const dialogRef = this.dialog.open(SignatureDialogueComponent, {
    width: '500px',
    height: '500px',
  });

  dialogRef.afterClosed().subscribe(result => {
    
    console.log('The dialog was closed');
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


}
