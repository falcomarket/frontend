import { Component,OnInit,LOCALE_ID ,Renderer2,Output, EventEmitter } from '@angular/core';
import { CameraDialogComponent } from './../../utilitaires/camera-dialog/camera-dialog.component';
import { CameraDialogService } from './../../utilitaires/camera-dialog/camera-dialog.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from './../../services/data.service';

import { MembreDTO,StatutAdhesion,TypeJustificatif,GenreMembre,
        Pays,Provinces,ChoixPlanAdhesion,AvantagesAdhesion} from './../../interfaces/data';

import { FormsModule} from '@angular/forms';

import { CommonModule } from '@angular/common';

import { MatIconModule} from '@angular/material/icon';
import { MatFormField, MatFormFieldModule,MatHint } from '@angular/material/form-field';

import { MatDialog } from '@angular/material/dialog';
import { MatCardModule} from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOption } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelect, MatLabel } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTabGroup } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS,MAT_DATE_LOCALE } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { AppDateAdapter} from './../../utilitaires/mat-date-picker/adapter.service';
import { MY_DATE_FORMATS } from './../../utilitaires/mat-date-picker/format-date';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask, } from 'ngx-mask';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { SignatureDialogueService } from './../../utilitaires/signature-dialogue/signature-dialogue.service';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { Codebar6MembreService } from './../../utilitaires/codebarmembre/codebar6.service';


registerLocaleData(localeFr);



@Component({
  selector: 'app-forms-perso',
  standalone: true,
  imports: [CommonModule,FormsModule,MatIconModule,MatFormFieldModule,
    MatCardModule,MatFormField,MatInput,
    MatOption,ReactiveFormsModule,MatMomentDateModule,MatSelect,MatLabel,MatHint,
    MatTabsModule,MatTabGroup,NgbModule,
    MatFormFieldModule,MatSelectModule,MatButtonModule,
    NgxMaskDirective,NgxMaskPipe,MatCheckboxModule,
    MatDatepickerModule,MatNativeDateModule,NgxBarcode6Module
    
  ],
  templateUrl: './forms-perso.component.html',
  styleUrl: './forms-perso.component.css',
  providers: [provideNgxMask(),
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: LOCALE_ID, useValue: 'fr-FR' }],
})


export class FormsPersoComponent implements OnInit{
  @Output() formDataEvent = new EventEmitter<FormGroup>();

  entreprise ='MegaStore';
  statutAdhesionValues = Object.values(StatutAdhesion);
  typeJustificatifValues = Object.values(TypeJustificatif);
  genreMembreValues = Object.values(GenreMembre);
  paysValues = Object.values(Pays);
  provincesValues = Object.values(Provinces);
  choixPlanAdhesionValues = Object.values(ChoixPlanAdhesion);
  avantagesAdhesionValues = Object.values(AvantagesAdhesion);
  capturedPhotoUrl: string | undefined;
  signatureurl: string | undefined;
  formspersonnel!: FormGroup;
  membre:MembreDTO|null=null ;
  
  emailMask = [/[a-zA-Z0-9._%+-]+/, '@', /[a-zA-Z0-9.-]+/, '.', /[a-zA-Z]{2,4}/];
  emailMaskPlaceholder = " benbakreti@hotmail.ca"
  
  facebookMask = /(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9._-]+/;
  facebookMaskPlaceholder = " http://facebook.com/mbi"
  
  instagramMask = /(@)[a-zA-Z0-9._-]+/;
  instagramMaskPlaceholder = "@megastore"
  
  googleMask = /(https?:\/\/)?(www\.)?google\.com\/[a-zA-Z0-9._-]+/;
  googleMaskPlaceholder = " http://google.com/mbi"
  
  JustificatifMask = 'U0000-000000-00';
  JustificatifPlaceholder = 'U0000-000000-00';
  
  accepterConfidentialiteValue='oui';
  accepterConsentement='non';

  constructor(private formBuilder: FormBuilder, private membreService: DataService,
    private cameraDialogService:CameraDialogService,
    private signatureDialogueService:SignatureDialogueService,
    public codebar6MembreService: Codebar6MembreService,
    private dialog: MatDialog,private erreurdialog: MatDialog) {
      
  }

  ngOnInit(): void {
    
    this.cameraDialogService.capturedPhotoUrl$.subscribe((capturedPhotoUrl) => {
      this.capturedPhotoUrl = capturedPhotoUrl;         
      }); 

    this.signatureDialogueService.signatureImage$.subscribe((signatureImage) => {
        this.signatureurl = signatureImage;     
        }); 

    this.initFormPerso();
  }

  initFormPerso(): void {
    this.formspersonnel = this.formBuilder.group({
      nom: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3),
        Validators.pattern("[A-Za-zÀ-ÿ- ]+")
      ]],
      prenom: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3),
        Validators.pattern("[A-Za-zÀ-ÿ- ]+")
      ]],
      dateNaissance: [new Date(), [
        Validators.required
      ]],
      genreMembre: ['Masculin'],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]],
      numeroTelephone: ['', [Validators.required]],
      pieceIdentite: ['P. Conduire', Validators.required],
      numPieceIdentite: ['', Validators.required],
      dateDelivrePiece: [new Date(), Validators.required],
      dateExpirePiece: [new Date(), Validators.required],
      adressePhysique: ['', [Validators.maxLength(300)]],
      codePostalMembre: ['', [Validators.required]],
      villeMembre: [''],
      paysMembre: ['Québec'],
      compteFacebook: ['http://facebook.com/',[Validators.pattern(this.facebookMask)]],
      compteInstagram: ['@',[Validators.pattern(this.instagramMask)]],
      compteGoogle: ['http://google.com/',[Validators.pattern(this.googleMask)]],
      photourl: [''],
      accepterConfidentialite: [false],
    });
   
  }
  onCancelFormPerso():void {
    this.formspersonnel.reset();    
    this.capturedPhotoUrl=''; 
  }

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

  onDateChange(event: MatDatepickerInputEvent<any>): void {
    
 
  }
  
  setJustificatifMask(pieceIdentite: string): void {
    switch (pieceIdentite) {
      case 'P. Conduire':
        this.JustificatifMask = 'U0000-000000-00';
        this.JustificatifPlaceholder = 'U0000-000000-99';
        break;
      case 'Passeport':
        this.JustificatifMask = 'UU000000';
        this.JustificatifPlaceholder = 'UU000000';
        break;
      case "C. Assurance":
        this.JustificatifMask = 'UUUU 0000 0000';
        this.JustificatifPlaceholder = 'UUUU 0000 0000';
        break;
    
      default:
        this.JustificatifMask = '';
        this.JustificatifPlaceholder = '';
        break;
    }
    
    this.formspersonnel.get('pieceIdentite')?.updateValueAndValidity();
    
  }

  updateJustificatifMasks(): void {
    const pieceIdentite = this.formspersonnel.get('pieceIdentite')!.value;
    this.setJustificatifMask(pieceIdentite);
  }
  onAccepterConfidentialiteChange(event: MatCheckboxChange): void {
    if (event.checked) {
      this.accepterConsentement='oui'
    } else {
      this.accepterConsentement='non'
    }
  }

   
      

    


  }


