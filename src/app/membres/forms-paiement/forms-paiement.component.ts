import { Component,LOCALE_ID ,CUSTOM_ELEMENTS_SCHEMA,Output, EventEmitter } from '@angular/core';
import { CameraDialogService } from './../../utilitaires/camera-dialog/camera-dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from './../../services/data.service';
import { MembreDTO} from './../../interfaces/data';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule} from '@angular/material/icon';
import { MatFormField, MatFormFieldModule,MatHint } from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatInput } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS,MAT_DATE_LOCALE } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { AppDateAdapter} from './../../utilitaires/mat-date-picker/adapter.service';
import { MY_DATE_FORMATS } from './../../utilitaires/mat-date-picker/format-date';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { SignatureDialogueService } from './../../utilitaires/signature-dialogue/signature-dialogue.service';
import { Codebar6MembreService } from './../../utilitaires/codebarmembre/codebar6.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask, } from 'ngx-mask';

registerLocaleData(localeFr);


@Component({
  selector: 'app-forms-paiement',
  standalone: true,
  imports: [CommonModule,FormsModule,MatIconModule,MatFormFieldModule,
    MatCardModule,MatFormField,MatInput,NgxMaskDirective,NgxMaskPipe,
    MatOption,ReactiveFormsModule,MatMomentDateModule,MatHint,NgbModule,
    MatFormFieldModule,MatButtonModule,MatNativeDateModule,
    
  ],
  templateUrl: './forms-paiement.component.html',
  styleUrl: './forms-paiement.component.css',
  providers: [provideNgxMask(),
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: LOCALE_ID, useValue: 'fr-FR' }],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormsPaiementComponent {
  @Output() formDataEvent = new EventEmitter<FormGroup>();

  entreprise ='MegaStore';
  capturedPhotoUrl: string | undefined;
  signatureurl: string | undefined;
  formspaiements!: FormGroup;
  membre:MembreDTO|null=null ;
  
  constructor(private formBuilder: FormBuilder, private membreService: DataService,
    private cameraDialogService:CameraDialogService,
    private signatureDialogueService:SignatureDialogueService,
    public codebar6MembreService: Codebar6MembreService) {
      
  }


  ngOnInit(): void {
    
    this.cameraDialogService.capturedPhotoUrl$.subscribe((capturedPhotoUrl) => {
      this.capturedPhotoUrl = capturedPhotoUrl;         
      }); 

    this.signatureDialogueService.signatureImage$.subscribe((signatureImage) => {
        this.signatureurl = signatureImage;     
        }); 

        
    this.initFormPaiement();
    
    
  }

  initFormPaiement(): void {
        
        this.formspaiements = this.formBuilder.group({
          nomTitulaireCarteCredit: ['', [Validators.required,Validators.required,Validators.maxLength(50),Validators.minLength(3)]],
          numeroCarteCredit: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
          moisExpirationCarteCredit: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
          anneeExpirationCarteCredit: ['', [Validators.required, Validators.min(2020), Validators.max(2040)]],
          codeSecuriteCarteCredit: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(3)]]
        });
        
     
    
  }
  

}
