import { Component,Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card'; 
@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.css'
})


export class ErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public errorMessage: string
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
