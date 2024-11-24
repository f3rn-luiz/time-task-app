import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
	selector: 'app-tarefas',
	templateUrl: 'tarefas.page.html',
	standalone: true,
	imports: [IonContent, IonTitle, IonToolbar, IonHeader],
})
export class TarefasPage {
	constructor() {}
}
