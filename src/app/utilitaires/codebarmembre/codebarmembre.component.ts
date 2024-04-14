import { Component, Input  } from '@angular/core';
import { NgxBarcode6Module } from 'ngx-barcode6';

@Component({
  selector: 'app-codebarmembre',
  standalone: true,
  imports: [NgxBarcode6Module],
  templateUrl: './codebarmembre.component.html',
  styleUrl: './codebarmembre.component.css'
})
export class CodebarmembreComponent {
  @Input() bcValue: string = '';
}
