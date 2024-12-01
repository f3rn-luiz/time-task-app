import { Injectable } from '@angular/core';
import { MesAno } from './calendario.type';

@Injectable({
	providedIn: 'root',
})
export class CalendarioService {
	dia_semana = [
		{ letra: 'D', simplificado: 'Dom', completo: 'Domingo' },
		{ letra: 'S', simplificado: 'Seg', completo: 'Segunda-feira' },
		{ letra: 'T', simplificado: 'Ter', completo: 'Terça-feira' },
		{ letra: 'Q', simplificado: 'Qua', completo: 'Quarta-feira' },
		{ letra: 'Q', simplificado: 'Qui', completo: 'Quinta-feira' },
		{ letra: 'S', simplificado: 'Sex', completo: 'Sexta-feira' },
		{ letra: 'S', simplificado: 'Sab', completo: 'Sábado' },
	];

	meses: MesAno[] = [
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

	constructor() {}
}
