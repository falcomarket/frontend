import { Component, OnInit, ViewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, } from '@angular/material/table';
import { MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MembreDTO } from '../../../interfaces/data';
import { DataService } from '../../../services/data.service';
import { MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSort } from '@angular/material/sort' ; 

import { MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-membres',
  standalone: true,
  imports: [CommonModule,MatPaginator,MatIconModule,MatTableModule,MatPaginator,FormsModule],
  templateUrl: './membres.component.html',
  styleUrl: './membres.component.css'
})

export class MembresComponent implements OnInit {
  
  constructor(private membresService: DataService,
    private dialog: MatDialog,
    private matPaginatorIntl: MatPaginatorIntl,) {
      this.matPaginatorIntl.nextPageLabel = 'Suivant';
      this.matPaginatorIntl.previousPageLabel = 'Precedant';
      this.matPaginatorIntl.firstPageLabel = 'Premier';
      this.matPaginatorIntl.lastPageLabel = 'Dernier';
      this.matPaginatorIntl.itemsPerPageLabel = 'Nombre Membres/Page';
      
    }

  @ViewChild(MatPaginator , { static: true }) paginator!: MatPaginator;


  searchTerm: string = ''; // Déclarez la propriété searchTerm
  searchOperator: string = 'AND'; // Déclarez la propriété searchOperator
  
  //searchTerm: string = ''; // Déclaration de la propriété searchTerm
  sortField: string = 'id'; // Champ de tri par défaut
  sortDirection: string = 'asc'; // Ordre de tri par défaut
  displayedColumns: string[] = ['id','nom','prenom','datenaissance','sexe',
                                'adresse','email','tel','action1','action2','action3','action4','action5'];
  totalElements: number = 0; 
  pageSizeOptions: number[] = [5, 10, 15, 20, 40,100,200,300,400,500,1000,1500];
  
  pageSize = 10;
  currentPage = 0;
  totalItems = 0;

  
  dataSource = new MatTableDataSource<MembreDTO>();

  
                
  ngOnInit() {   
    this.loadMembres();
    
  }
  
  loadMembres() {
    
      this.membresService.getPagedMembres(this.currentPage, this.pageSize, this.sortField, this.sortDirection).subscribe((data) => {
        if (data && data.content) {
          
          console.log("data.totaleelements:",data.totalElements);
          if (data.totalElements) {
            this.dataSource.data = data.content;
            this.totalItems = data.totalElements;
            this.paginator.length =this.totalItems;
            this.paginator.pageSize=this.pageSize;
          }
          else {
            
          }
        } else {
          console.error("La réponse du service ne contient pas la propriété 'content'.");
        }
      });
  }
  
  OnPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadMembres();
  }


  sortBy(sortField: string) {
    // Mettre à jour sortField et invertir la direction si nécessaire
    this.sortField = sortField;
    this.sortDirection = this.sortField === sortField ? (this.sortDirection === 'asc' ? 'desc' : 'asc') : 'asc';
  
    // Recharger les données triées depuis le service
    this.loadMembres();
  }
   
  
    
  search() {
    const searchTerms = this.searchTerm.split(/\s+/); // Divisez la chaîne de recherche en termes individuels
    let filteredData = this.dataSource.data;
  
    // Parcourir chaque terme de recherche
    for (const term of searchTerms) {
      if (term.toLowerCase() === 'and') {
        // Opérateur "ET" - intersection des résultats
        const andTerms = searchTerms.splice(searchTerms.indexOf(term) + 1);
        filteredData = this.filterDataWithOperator(filteredData, andTerms, 'AND');
        break; // Sortir de la boucle après avoir traité l'opérateur ET
      } else if (term.toLowerCase() === 'or') {
        // Opérateur "OU" - union des résultats
        const orTerms = searchTerms.splice(searchTerms.indexOf(term) + 1);
        filteredData = this.filterDataWithOperator(filteredData, orTerms, 'OR');
        break; // Sortir de la boucle après avoir traité l'opérateur OU
      } else {
        // Recherche normale en filtrant chaque colonne
        filteredData = this.filterData(filteredData, term);
      }
    }
  
    // Mettre à jour la source de données avec les membres filtrés
    this.dataSource.data = filteredData;
  
    // Réinitialiser la pagination à la première page
    this.paginator.firstPage();
  }
  
  // Fonction pour filtrer les données avec opérateur logique
  filterDataWithOperator(data: MembreDTO[], terms: string[], operator: 'AND' | 'OR') {
    let filteredData = data;
  
    for (const term of terms) {
      if (operator === 'AND') {
        // Opérateur "ET" - Intersection des résultats
        filteredData = filteredData.filter((membre) =>
          membre.nom.toLowerCase().includes(term.toLowerCase()) ||
          membre.prenom.toLowerCase().includes(term.toLowerCase())
          // Ajoutez d'autres colonnes ici si nécessaire
        );
      } else if (operator === 'OR') {
        // Opérateur "OU" - Union des résultats
        const filteredResults = data.filter((membre) =>
          membre.nom.toLowerCase().includes(term.toLowerCase()) ||
          membre.prenom.toLowerCase().includes(term.toLowerCase())
          // Ajoutez d'autres colonnes ici si nécessaire
        );
        // Fusionner les résultats avec les résultats précédents
        filteredData = [...filteredData, ...filteredResults];
      }
    }
  
    // Éliminer les doublons s'il y en a
    filteredData = [...new Set(filteredData)];
  
    return filteredData;
  }
  
  // Fonction pour filtrer les données avec un seul terme
  filterData(data: MembreDTO[], term: string) {
    return data.filter((membre) =>
      membre.nom.toLowerCase().includes(term.toLowerCase()) ||
      membre.prenom.toLowerCase().includes(term.toLowerCase())
      // Ajoutez d'autres colonnes ici si nécessaire
    );
  }


  

}
  
  


 



