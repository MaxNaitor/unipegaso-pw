import { Routes } from '@angular/router';
import { IlMioContoComponent } from './components/il-mio-conto/il-mio-conto.component';
import { MercatiComponent } from './components/mercati/mercati.component';
import { StoricoTransazioniComponent } from './components/storico-transazioni/storico-transazioni.component';

export const routes: Routes = [
    {path: '', redirectTo: 'il-mio-conto', pathMatch: 'full'},
    {path: 'il-mio-conto', component: IlMioContoComponent},
    {path: 'mercati', component: MercatiComponent},
    {path: 'transazioni', component: StoricoTransazioniComponent},
];
