import { Routes } from '@angular/router';
import { MenuPage } from './menu.page';

export const routes: Routes = [
	{
		path: '',
		component: MenuPage,
		children: [
			{ path: 'calendario', loadComponent: () => import('src/app/pages/calendario/calendario.page').then((p) => p.CalendarioPage) },

			{ path: 'cronograma', loadComponent: () => import('src/app/pages/cronograma/cronograma.page').then((p) => p.CronogramaPage) },

			{ path: 'tarefas', loadComponent: () => import('src/app/pages/tarefas/tarefas.page').then((p) => p.TarefasPage) },

			{ path: 'configuracao', loadComponent: () => import('src/app/pages/configuracao/configuracao.page').then((p) => p.ConfiguracaoPage) },

			{ path: '', redirectTo: 'calendario', pathMatch: 'full' },
		],
	},
	{ path: '', redirectTo: 'calendario', pathMatch: 'full' },
];
