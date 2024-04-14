
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MembresComponent } from './components/membres/membres/membres.component';
import { HttpClientModule } from '@angular/common/http';
import { NouveauComponent } from './components/produits/nouveau/nouveau.component';
import { provideEnvironmentNgxMask } from 'ngx-mask';
//import { ReactiveFormsModule } from '@angular/forms';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink,HttpClientModule,
            MatToolbarModule,MatIconModule,MatButtonModule,
            HeaderComponent,SideNavComponent, MembresComponent, 
            NouveauComponent],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'FrontEnd';
  sideNavStatus: boolean = false;
  
}


