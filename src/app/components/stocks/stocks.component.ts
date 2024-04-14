import { Component,OnInit,ViewChild  } from '@angular/core';
import { NgModule } from '@angular/core';
import { CameraDialogComponent } from '../../utilitaires/camera-dialog/camera-dialog.component';
import { CameraDialogService } from '../../utilitaires/camera-dialog/camera-dialog.service';
import { FormBuilder, FormGroup, Validators,FormControl, FormControlName } from '@angular/forms';
import { DataService } from "../../services/data.service";
import { MembreDTO} from '../../interfaces/data';
import { ErrorDialogComponent } from '../../utilitaires/error-dialog/error-dialog.component';
import { FormsModule} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatIconModule} from '@angular/material/icon';
import { MatFormField, MatFormFieldModule,MatFormFieldControl } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule} from '@angular/material/card';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatOption } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelect, MatLabel } from '@angular/material/select';
import { MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTabGroup } from '@angular/material/tabs';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule,FormsModule,MatIconModule,MatFormFieldModule,
    MatCardModule,MatDatepickerModule,MatFormField,MatInput,
    MatOption,ReactiveFormsModule,MatMomentDateModule,MatSelect,MatLabel,MatHint,
    MatTabsModule,MatTabGroup,
  ],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css'
})
export class StocksComponent {


  constructor(private formBuilder: FormBuilder, private membreService: DataService,
    private erreurdialog: MatDialog) {}

}



