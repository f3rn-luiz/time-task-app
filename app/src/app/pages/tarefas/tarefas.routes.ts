import { Routes } from '@angular/router';

export const TarefasRoutes: Routes = [
	{ path: '', loadComponent: () => import('src/app/pages/tarefas/tarefas.page').then((p) => p.TarefasPage) },
	{ path: 'hoje', loadComponent: () => import('src/app/pages/tarefas/hoje/tarefas-hoje.page').then((p) => p.TarefasHojePage) },
];
