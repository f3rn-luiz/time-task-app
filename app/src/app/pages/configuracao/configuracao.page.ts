import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
	selector: 'app-configuracao',
	templateUrl: 'configuracao.page.html',
	standalone: true,
	imports: [IonContent, IonTitle, IonToolbar, IonHeader],
})
export class ConfiguracaoPage {
	constructor() {}
}
