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
	data_selecionada = this.hoje;

	mes: any[][] = [[]];

	sem_comeca_segunda = false;
	semana = {
		domingo: [
			{ letra: 'D', simplificado: 'Dom', completo: 'Domingo' },
			{ letra: 'S', simplificado: 'Seg', completo: 'Segunda-feira' },
			{ letra: 'T', simplificado: 'Ter', completo: 'Terça-feira' },
			{ letra: 'Q', simplificado: 'Qua', completo: 'Quarta-feira' },
			{ letra: 'Q', simplificado: 'Qui', completo: 'Quinta-feira' },
			{ letra: 'S', simplificado: 'Sex', completo: 'Sexta-feira' },
			{ letra: 'S', simplificado: 'Sab', completo: 'Sábado' },
		],
		segunda: [
			{ letra: 'S', simplificado: 'Seg', completo: 'Segunda-feira' },
			{ letra: 'T', simplificado: 'Ter', completo: 'Terça-feira' },
			{ letra: 'Q', simplificado: 'Qua', completo: 'Quarta-feira' },
			{ letra: 'Q', simplificado: 'Qui', completo: 'Quinta-feira' },
			{ letra: 'S', simplificado: 'Sex', completo: 'Sexta-feira' },
			{ letra: 'S', simplificado: 'Sab', completo: 'Sábado' },
			{ letra: 'D', simplificado: 'Dom', completo: 'Domingo' },
		],
	};

	meses = [
		{ simplificado: 'Jan', completo: 'Janeiro' },
		{ simplificado: 'Fev', completo: 'Fevereiro' },
		{ simplificado: 'Mar', completo: 'Março' },
		{ simplificado: 'Abr', completo: 'Abril' },
		{ simplificado: 'Mai', completo: 'Maio' },
		{ simplificado: 'Jun', completo: 'Junho' },
		{ simplificado: 'Jul', completo: 'Julho' },
		{ simplificado: 'Ago', completo: 'Agosto' },
		{ simplificado: 'Set', completo: 'Setembro' },
		{ simplificado: 'Out', completo: 'Outubro' },
		{ simplificado: 'Nov', completo: 'Novembro' },
		{ simplificado: 'Dez', completo: 'Dezembro' },
	];

	constructor() {
		console.log('hoje: ' + this.hoje);
		this.ordenarDias();
	}

	diaSelecionado(data: any): boolean {
		if (data.atual && data.dia === this.data_selecionada.getDate()) return true;
		return false;
	}

	ordenarDias() {
		let primeiro_dia = new Date(`${this.data_selecionada.getMonth() + 1}/01/${this.data_selecionada.getFullYear()}`);
		let ultimo_dia: Date | number = new Date(`${this.data_selecionada.getMonth() + 1 === 12 ? 1 : this.data_selecionada.getMonth() + 2}/01/${this.data_selecionada.getFullYear()}`);
		ultimo_dia.setHours(23, 59, 59);
		ultimo_dia = new Date(ultimo_dia.getTime() - 86400000);

		console.log('PD: ', primeiro_dia);
		console.log('UD: ', ultimo_dia);

		let dia_semana = primeiro_dia.getDay();
		let semana = 0;

		console.log('dia_semana: ', dia_semana);

		for (let idx = 1; idx <= ultimo_dia.getDate(); idx++) {
			if (idx === 1 && dia_semana !== 0) {
				let n = new Date(primeiro_dia.getTime() - 86400000).getDate() - (dia_semana - 1);
				for (let si = 0; si < dia_semana; si++, n++) {
					this.mes[0][si] = { dia: n, atual: false, hoje: false, domingo: si === 0 };
				}
			} else if (idx === ultimo_dia.getDate() && ultimo_dia.getDay() !== 6) {
				let n = 0;
				for (let si = ultimo_dia.getDay(); si <= 6; si++, n++) {
					this.mes[semana][si] = { dia: n, atual: false, hoje: false, domingo: false };
				}
			}

			let isHoje = this.data_selecionada.getMonth() === this.hoje.getMonth() && this.data_selecionada.getFullYear() === this.hoje.getFullYear() && idx === this.hoje.getDate();
			this.mes[semana][dia_semana] = { dia: idx, atual: true, hoje: isHoje, domingo: dia_semana === 0 };

			if (dia_semana === 6 && idx !== ultimo_dia.getDate()) {
				dia_semana = 0;
				semana++;
				this.mes.push([]);
			} else dia_semana++;
		}
		console.log('DIAS: ', this.mes);
	}

	selecionarData(data: any) {
		console.log('CLICK: ', data);
		if (data.atual && data.dia !== this.data_selecionada.getDate()) this.data_selecionada = new Date(`${this.data_selecionada.getMonth() + 1}/${data.dia}/${this.data_selecionada.getFullYear()}`);
	}
}
