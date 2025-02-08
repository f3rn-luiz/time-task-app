import { Routes } from '@angular/router';

export const routes: Routes = [{ path: '', loadChildren: () => import('./pages/menu/menu.routes').then((m) => m.routes) }];
