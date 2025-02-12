import { Component } from '@angular/core';
import { IonContent, IonIcon, IonRippleEffect, NavController } from '@ionic/angular/standalone';
import { DataSimples, dia_semana, meses } from 'src/app/core/calendario/calendario.type';

@Component({
	selector: 'app-tarefas-hoje',
	templateUrl: 'tarefas-hoje.page.html',
	styleUrl: 'tarefas-hoje.page.scss',
	standalone: true,
	imports: [IonRippleEffect, IonIcon, IonContent],
})
export class TarefasHojePage {
	data_hoje: Date = new Date();
	data_simples_hoje: DataSimples = { dia: this.data_hoje.getDate(), mes: this.data_hoje.getMonth(), ano: this.data_hoje.getFullYear() };
	data_hoje_formatada: string = `${dia_semana[this.data_hoje.getDay()].completo}, ${this.data_simples_hoje.dia} de ${meses[this.data_simples_hoje.mes].completo}`;

	constructor(private navController: NavController) {}

	voltarParaTarefas = () => this.navController.navigateBack('tarefas');
}
