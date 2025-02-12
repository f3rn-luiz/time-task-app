import { Component } from '@angular/core';
import { IonContent, IonHeader, IonIcon, IonRippleEffect, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';

@Component({
	selector: 'app-tarefas',
	templateUrl: 'tarefas.page.html',
	styleUrl: 'tarefas.page.scss',
	standalone: true,
	imports: [IonIcon, IonRippleEffect, IonContent, IonTitle, IonToolbar, IonHeader],
})
export class TarefasPage {
	constructor(private navController: NavController) {}

	irParaTarefa = (rota: string) => this.navController.navigateForward(`tarefas/${rota}`);
}
