import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
	selector: 'app-tarefas-hoje',
	templateUrl: 'tarefas-hoje.page.html',
	standalone: true,
	imports: [IonContent, IonTitle, IonToolbar, IonHeader],
})
export class TarefasHojePage {
	constructor() {}
}
