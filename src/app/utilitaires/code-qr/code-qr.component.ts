import { Component, OnInit } from '@angular/core';
import { NgxQRCodeModule, NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';;

@Component({
  selector: 'app-code-qr',
  standalone: true,
  imports: [],
  templateUrl: './code-qr.component.html',
  styleUrl: './code-qr.component.css'
})
export class CodeQRComponent implements OnInit {
  qrData: string = 'Données pour le code QR';


  constructor() { }

  ngOnInit(): void {
  }
}
