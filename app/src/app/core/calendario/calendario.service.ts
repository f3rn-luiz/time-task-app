import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dia, Mes, MesAno } from './calendario.type';

@Injectable({
	providedIn: 'root',
})
export class CalendarioService {
	data_hoje: Date = new Date();

	calendario: BehaviorSubject<Mes[] | null> = new BehaviorSubject<Mes[] | null>(null);
	datas_loop: BehaviorSubject<Mes[]> = new BehaviorSubject<Mes[]>([]); // index 0 -> mes atual / index 1 -> proximo mes / index 2 -> mes anterior / (Tudo muda de acordo com o index atual do swiper)
	data_seletor: BehaviorSubject<Date> = new BehaviorSubject<Date>(this.data_hoje);
	data_selecionada: BehaviorSubject<Date> = new BehaviorSubject<Date>(this.data_hoje);

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

	constructor() {
		this.carregarCalendario();
	}

	carregarCalendario() {
		this.carregarMes({ mes: this.data_hoje.getMonth() - 1 < 0 ? 11 : this.data_hoje.getMonth() - 1, ano: this.data_hoje.getMonth() - 1 < 0 ? this.data_hoje.getFullYear() - 1 : this.data_hoje.getFullYear() }, true);
		this.carregarMes({ mes: this.data_hoje.getMonth(), ano: this.data_hoje.getFullYear() }, true, true);
		this.carregarMes({ mes: this.data_hoje.getMonth() + 1 > 11 ? 0 : this.data_hoje.getMonth() + 1, ano: this.data_hoje.getMonth() + 1 > 11 ? this.data_hoje.getFullYear() + 1 : this.data_hoje.getFullYear() }, true);
		this.datas_loop.next([this.calendario.value![1], this.calendario.value![2], this.calendario.value![0]]);
	}

	carregarMes(data: { mes: number; ano: number }, ultimo: boolean, atual: boolean = false) {
		let primeiro_dia = new Date(`${data.mes + 1}/01/${data.ano}`);
		let ultimo_dia: Date = new Date(`${data.mes + 1 === 12 ? 1 : data.mes + 2}/01/${data.ano}`);
		ultimo_dia.setHours(23, 59, 59);
		ultimo_dia = new Date(ultimo_dia.getTime() - 86400000);

		let dia_semana = primeiro_dia.getDay();
		let mes: Mes = { mes: data.mes, dias: [], ano: data.ano, atual: atual };

		if (dia_semana > 0) {
			let dia_mes_anterior = new Date(primeiro_dia.getTime() - 86400000).getDate();
			for (let idx = dia_semana - 1; idx >= 0; idx--) {
				if (mes.dias) mes.dias = [{ dia: dia_mes_anterior, dia_semana: idx, mes_atual: false }, ...mes.dias];
				else mes.dias = [{ dia: dia_mes_anterior, dia_semana: idx, mes_atual: false }];
				dia_mes_anterior--;
			}
		}

		for (let idx = 1; idx <= ultimo_dia.getDate(); idx++) {
			mes.dias.push({ dia: idx, dia_semana: dia_semana, mes_atual: true });
			dia_semana = dia_semana === 6 ? 0 : dia_semana + 1;
		}

		if (dia_semana > 0) {
			for (let idx = 1; dia_semana <= 6; idx++) {
				mes.dias.push({ dia: idx, dia_semana: dia_semana, mes_atual: false });
				dia_semana++;
			}
		}

		if (this.calendario.value) {
			if (ultimo) this.calendario.next([...this.calendario.value, mes]);
			else this.calendario.next([mes, ...this.calendario.value]);
		} else this.calendario.next([mes]);
	}

	selecionarData(dia: Dia, mes: Mes) {
		let modelo_data = `${mes.mes + 1 <= 9 ? '0' : ''}${mes.mes + 1}/${dia.dia <= 9 ? '0' : ''}${dia.dia}/${mes.ano}`;
		this.data_selecionada.next(new Date(modelo_data));
	}

	incrementarCalendario(ultimo: boolean) {
		if (ultimo) {
			const ultimo_mes = this.calendario.value![this.calendario.value!.length - 1];
			this.carregarMes({ mes: ultimo_mes.mes + 1 > 11 ? 0 : ultimo_mes.mes + 1, ano: ultimo_mes.mes + 1 > 11 ? ultimo_mes.ano + 1 : ultimo_mes.ano }, true);
		} else {
			const primeiro_mes = this.calendario.value![0];
			this.carregarMes({ mes: primeiro_mes.mes - 1 < 0 ? 11 : primeiro_mes.mes - 1, ano: primeiro_mes.mes - 1 < 0 ? primeiro_mes.ano - 1 : primeiro_mes.ano }, false);
		}
	}

	atualizarDatasLoop(slide_atual: number, proximo: boolean) {
		const data_atual = { mes: this.datas_loop.value[slide_atual].mes, ano: this.datas_loop.value[slide_atual].ano };
		let data: Mes | undefined;
		if (proximo) {
			data = this.calendario.value!.find((c) => c.mes === (data_atual.mes === 11 ? 0 : data_atual.mes + 1) && c.ano === (data_atual.mes === 11 ? data_atual.ano + 1 : data_atual.ano));
			if (!data) {
				this.incrementarCalendario(true);
				data = this.calendario.value![this.calendario.value!.length - 1];
			}
		} else {
			data = this.calendario.value!.find((c) => c.mes === (data_atual.mes === 0 ? 11 : data_atual.mes - 1) && c.ano === (data_atual.mes === 0 ? data_atual.ano - 1 : data_atual.ano));
			if (!data) {
				this.incrementarCalendario(false);
				data = this.calendario.value![0];
			}
		}
		if (data) this.injetarDataLoop(slide_atual, proximo, data);
	}

	injetarDataLoop(slide_atual: number, proximo: boolean, data: Mes) {
		let datas_loop = this.datas_loop.value;
		if (slide_atual === 0) {
			if (proximo) datas_loop[1] = data;
			else datas_loop[2] = data;
		} else if (slide_atual === 1) {
			if (proximo) datas_loop[2] = data;
			else datas_loop[0] = data;
		} else {
			if (proximo) datas_loop[0] = data;
			else datas_loop[1] = data;
		}
		this.datas_loop.next(datas_loop);
	}
}
