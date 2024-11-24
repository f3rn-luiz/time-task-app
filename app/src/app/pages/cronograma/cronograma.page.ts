import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
	selector: 'app-cronograma',
	templateUrl: 'cronograma.page.html',
	standalone: true,
	imports: [IonContent, IonTitle, IonToolbar, IonHeader],
})
export class CronogramaPage {
	constructor() {}
}
