import { Routes } from '@angular/router';
import { EnregistrementComponent } from './components/ventes/enregistrement/enregistrement.component';
import { ListeComponent } from './components/produits/liste/liste.component';

import { FacturationsComponent } from './components/ventes/facturations/facturations.component';
import { AchatsComponent } from './components/achats/achats.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { MembresComponent } from './components/membres/membres/membres.component';
import { NouveauMembreComponent } from './membres/nouveau-membre/nouveau-membre.component';
import { ProfilMembreComponent } from './components/membres/profil-membre/profil-membre.component';
import { RechercheMembreComponent } from './components/membres/recherche-membre/recherche-membre.component';
import { ListMembreComponent } from './components/membres/list-membre/list-membre.component';
import { DashboardMembreComponent } from './components/membres/dashboard-membre/dashboard-membre.component';
import { FacturesComponent } from './components/membres/rapports-financiers/factures/factures.component';
import { RelevesComponent } from './components/membres/rapports-financiers/releves/releves.component';
import { HistoriqueComponent } from './components/membres/rapports-financiers/historique/historique.component';
import { SoldeComponent } from './components/membres/rapports-financiers/solde/solde.component';
import { TaxesComponent } from './components/membres/rapports-financiers/taxes/taxes.component';
import { EditMembreComponent } from './components/membres/edit-membre/edit-membre.component';

export const routes: Routes = [
  
  { path: '', component: NouveauMembreComponent},
  { path: 'transaction_vente', component: EnregistrementComponent},
  { path: 'portail_produits', component:  ListeComponent},
  { path: 'ventes_clients', component: MembresComponent},
  { path: 'nouveau_membre', component: NouveauMembreComponent},
  { path: 'edit_membre', component:EditMembreComponent},
  { path: 'achats', component: AchatsComponent},
  { path: 'stocks', component: StocksComponent},
  
  { path: 'newmembre', component: NouveauMembreComponent},
  { path: 'editmembre', component:EditMembreComponent},
  { path: 'profilmembre', component: ProfilMembreComponent},
  { path: 'foundmembre', component: RechercheMembreComponent},
  { path: 'listmembre', component: ListMembreComponent},
  { path: 'rapports/rfinancier', component: FacturesComponent},
  { path: 'rapports/rcompte', component: RelevesComponent},
  { path: 'rapports/hpaiements', component: HistoriqueComponent},
  { path: 'rapports/scompte', component: SoldeComponent},
  { path: 'rapport/dtaxes', component: TaxesComponent},
  
 
];