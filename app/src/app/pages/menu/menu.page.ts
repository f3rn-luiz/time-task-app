import { Component } from '@angular/core';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';

@Component({
	selector: 'app-menu',
	templateUrl: 'menu.page.html',
	standalone: true,
	imports: [IonLabel, IonIcon, IonTabBar, IonTabButton, IonTabs],
})
export class MenuPage {
	constructor() {}
}
