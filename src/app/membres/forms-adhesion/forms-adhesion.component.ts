import { Component,LOCALE_ID ,CUSTOM_ELEMENTS_SCHEMA,Output, EventEmitter } from '@angular/core';
import { CameraDialogService } from './../../utilitaires/camera-dialog/camera-dialog.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from './../../services/data.service';

import { MembreDTO,StatutAdhesion,ChoixPlanAdhesion,MontantPlanAdhesion,AvantagesAdhesion} from './../../interfaces/data';



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

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
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
  selector: 'app-forms-adhesion',
  standalone: true,
  imports: [CommonModule,FormsModule,MatIconModule,MatFormFieldModule,
    MatCardModule,MatFormField,MatInput,
    MatOption,ReactiveFormsModule,MatMomentDateModule,MatSelect,MatLabel,MatHint,
    MatTabsModule,MatTabGroup,NgbModule,
    MatFormFieldModule,MatSelectModule,MatButtonModule,
    NgxMaskDirective,NgxMaskPipe,MatCheckboxModule,
    MatDatepickerModule,MatNativeDateModule,NgxBarcode6Module
    
  ],
  templateUrl: './forms-adhesion.component.html',
  styleUrl: './forms-adhesion.component.css',
  providers: [provideNgxMask(),
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: LOCALE_ID, useValue: 'fr-FR' }],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormsAdhesionComponent {

  @Output() formDataEvent = new EventEmitter<FormGroup>();
  
  membre:MembreDTO|null=null ;
  statutAdhesionValues = Object.values(StatutAdhesion);
  choixPlanAdhesionValues = Object.values(ChoixPlanAdhesion);
  avantagesAdhesionValues = Object.values(AvantagesAdhesion);
  choixMontantAdhesionValues = Object.values(ChoixPlanAdhesion);
  
  formsadhesion!: FormGroup;
  capturedPhotoUrl: string | undefined;
  signatureurl: string | undefined;
  
  type= '';
  montant='';
  choixPlanAdhesion = ChoixPlanAdhesion;
  montantPlanAdhesion = MontantPlanAdhesion;

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

    this.initFormAdhesion();
    
    
  }

  initFormAdhesion(): void {
  
    this.formsadhesion = this.formBuilder.group({ 
      dateDebutAdhesion: [new Date()],
      dateFinAdhesion: [new Date()],
      statutAdhesion: ['En attente', Validators.required],
      typeAdhesion: [''],
      montantAdhesion:[''],
    });    
    console.log('init',this.formsadhesion)
    
  }

  onChoix1():void{
    const formData = this.formsadhesion.value;
    formData.typeAdhesion=this.choixPlanAdhesion.choixPlanAdhesion1;
    formData.montantAdhesion = this.montantPlanAdhesion.montantPlanAdhesion1;
    this.type=this.choixPlanAdhesion.choixPlanAdhesion1;
    this.montant=this.montantPlanAdhesion.montantPlanAdhesion1;
  }
  onChoix2():void{
    const formData = this.formsadhesion.value;
    formData.typeAdhesion=this.choixPlanAdhesion.choixPlanAdhesion2;
    formData.montantAdhesion = this.montantPlanAdhesion.montantPlanAdhesion2;
    this.type=this.choixPlanAdhesion.choixPlanAdhesion2;
    this.montant=this.montantPlanAdhesion.montantPlanAdhesion2;
    
  }
  onChoix3():void{
    const formData = this.formsadhesion.value;
    formData.typeAdhesion=this.choixPlanAdhesion.choixPlanAdhesion3;
    formData.montantAdhesion = this.montantPlanAdhesion.montantPlanAdhesion3;
    this.type=this.choixPlanAdhesion.choixPlanAdhesion3;
    this.montant=this.montantPlanAdhesion.montantPlanAdhesion3;
    
  }

  
 }
  

