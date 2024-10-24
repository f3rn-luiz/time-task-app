import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
	selector: 'app-calendario',
	templateUrl: 'calendario.page.html',
	standalone: true,
	imports: [IonicModule, CommonModule],
})
export class CalendarioPage {
	hoje = new Date();
	mes: string[][] = [[]];

	constructor() {
		console.log('hoje: ' + this.hoje);
		this.ordenarDias();
	}

	ordenarDias() {
		let primeiro_dia = new Date(`${this.hoje.getMonth() + 1}/01/${this.hoje.getFullYear()}`);
		let ultimo_dia: Date | number = new Date(`${this.hoje.getMonth() + 1 === 12 ? 1 : this.hoje.getMonth() + 2}/01/${this.hoje.getFullYear()}`);
		ultimo_dia.setHours(23, 59, 59);
		ultimo_dia = new Date(ultimo_dia.getTime() - 86400000);

		console.log('PD: ', primeiro_dia);
		console.log('UD: ', ultimo_dia);

		let dia_semana = primeiro_dia.getDay();
		let semana = 0;

		for (let idx = 1; idx <= ultimo_dia.getDate(); idx++) {
			if (idx === 1 && dia_semana !== 0) for (let si = 0; si < dia_semana; si++) this.mes[0][si] = '-';
			else if (idx === ultimo_dia.getDate() && ultimo_dia.getDay() !== 6) for (let si = ultimo_dia.getDay(); si <= 6; si++) this.mes[semana][si] = '-';

			this.mes[semana][dia_semana] = `${idx}`;

			if (dia_semana === 6 && idx !== ultimo_dia.getDate()) {
				dia_semana = 0;
				semana++;
				this.mes.push([]);
			} else dia_semana++;
		}
		console.log('DIAS: ', this.mes);
	}
}
