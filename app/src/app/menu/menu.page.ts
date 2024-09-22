import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
	selector: 'app-menu',
	templateUrl: 'menu.page.html',
	standalone: true,
	imports: [IonicModule],
})
export class MenuPage {
	public environmentInjector = inject(EnvironmentInjector);

	constructor() {}
}
