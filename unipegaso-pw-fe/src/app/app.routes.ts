import { Routes } from '@angular/router';
import { IlMioContoComponent } from './components/il-mio-conto/il-mio-conto.component';
import { MercatiComponent } from './components/mercati/mercati.component';
import { StoricoTransazioniComponent } from './components/storico-transazioni/storico-transazioni.component';
import { AuthGuard } from './components/guards/auth-guard';
import { LoginComponent } from './components/login/login/login.component';

export const routes: Routes = [
    {path: '', redirectTo: 'il-mio-conto', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'il-mio-conto', component: IlMioContoComponent, canActivate: [AuthGuard]},
    {path: 'mercati', component: MercatiComponent, canActivate: [AuthGuard]},
    {path: 'transazioni', component: StoricoTransazioniComponent, canActivate: [AuthGuard]},
];
