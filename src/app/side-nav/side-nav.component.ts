import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})


export class SideNavComponent implements OnInit {
  @Input() sideNavStatus: boolean = false;

list = [
  {
    number: '1',
    name:'Transaction Vente',
    route:'/transaction_vente',
    icon:'fas fa-store-alt'
  },
  {
    number: '2',
    name:'Portail Produits',
    route:'/portail_produits',
    icon: 'fas fa-cube',
  },
  {
    number: '3',
    name:'Ventes Clients',
    route:'/ventes_clients',
    icon: 'fa-solid fa-users',
  },
  {
    number: '4',
    name:'nouveau_membre',
    route:'/nouveau_membre',
    icon: 'fas fa-dollar-sign',
  },
  {
    number: '5',
    name:'Achats',
    route:'/achats',
    icon:'fas fa-money-bill-wave',
  },
  {
    number: '6',
    name:'Stocks',
    route:'/stocks',
    icon:'fa-solid fa-book'
  },
  {
    number: '7',
    name:'Communications',
    route:'/communications',
    icon:'fas fa-comments'
  },
  {
    number: '8',
    name:'A propos ...',
    route:'/apropos',
    icon:'fa-solid fa-circle-info'
  },
  {
    number: '9',
    name:'Contact',
    route:'/contact',
    icon:'fa-solid fa-phone'
  },
];

constructor(private router: Router) {};

ngOnInit():void {};

navigateTo(route: string): void {
  this.router.navigate([route]);
}

}
