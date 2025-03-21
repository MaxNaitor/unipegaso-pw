import { Routes } from '@angular/router';
import { IlMioContoComponent } from './components/il-mio-conto/il-mio-conto.component';
import { MercatiComponent } from './components/mercati/mercati.component';
import { StoricoTransazioniComponent } from './components/storico-transazioni/storico-transazioni.component';
import { AuthGuard } from './guards/auth-guard';
import { LoginComponent } from './components/login/login/login.component';
import { ImparaComponent } from './components/impara/impara.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';


export const LOGIN_PATH = 'login'
export const IL_MIO_CONTO_PATH = 'il-mio-conto'
export const MERCATI_PATH = 'mercati'
export const TRANSAZIONI_PATH = 'transazioni'
export const IMPARA_PATH = 'impara'
export const ADMIN_PATH = 'admin'

export const routes: Routes = [
    { path: '', redirectTo: IL_MIO_CONTO_PATH, pathMatch: 'full' },
    { path: LOGIN_PATH, component: LoginComponent },
    { path: IL_MIO_CONTO_PATH, component: IlMioContoComponent, canActivate: [AuthGuard] },
    { path: MERCATI_PATH, component: MercatiComponent, canActivate: [AuthGuard] },
    { path: TRANSAZIONI_PATH, component: StoricoTransazioniComponent, canActivate: [AuthGuard] },
    { path: IMPARA_PATH, component: ImparaComponent, canActivate: [AuthGuard] },
    { path: ADMIN_PATH, component: DashboardAdminComponent, canActivate: [AuthGuard] }
];

