import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonModal, IonToolbar } from '@ionic/angular/standalone';
import { CalendarioService } from 'src/app/core/calendario/calendario.service';
import { DataSimples, Dia, dia_semana, DiaSemana, Mes, MesAno, meses } from 'src/app/core/calendario/calendario.type';
import { Swiper } from 'swiper/types';
import { SelectMonthYearComponent } from './select-month-year/select-month-year.component';

@Component({
	selector: 'app-calendario',
	templateUrl: 'calendario.page.html',
	styleUrl: 'calendario.scss',
	standalone: true,
	imports: [IonContent, IonToolbar, IonHeader, IonModal, CommonModule, SelectMonthYearComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalendarioPage implements OnInit {
	dias_semana: DiaSemana[] = dia_semana;
	meses: MesAno[] = meses;

	private swiper!: Swiper;
	datas_swiper!: Mes[];
	slides_swiper = [0, 1, 2];
	slide_atual: number = 0;

	data_hoje: Date = new Date();
	data_simples_hoje: DataSimples = { dia: this.data_hoje.getDate(), mes: this.data_hoje.getMonth(), ano: this.data_hoje.getFullYear() };
	data_selecionada!: DataSimples;

	constructor(private calendarioService: CalendarioService) {
		calendarioService.datas_loop.subscribe({
			next: (c) => {
				if (c) {
					if (!this.datas_swiper) this.datas_swiper = c;
					else this.atualizarInjecaoDatas(c);
				}
			},
		});
		calendarioService.data_selecionada.subscribe({ next: (d) => (this.data_selecionada = d) });
	}

	ngOnInit(): void {
		this.iniciarEventosSwiper();
	}

	voltarHoje = () => this.calendarioService.carregarPeriodo({ mes: this.data_simples_hoje.mes, ano: this.data_simples_hoje.ano }, this.slide_atual, true);
	selecionarMesAno = (dados: { mes: number; ano: number }) => this.calendarioService.carregarPeriodo(dados, this.slide_atual);

	atualizarInjecaoDatas(datas: Mes[]) {
		for (let idx = 0; idx < 3; idx++) {
			this.datas_swiper[idx].mes = datas[idx].mes;
			this.datas_swiper[idx].ano = datas[idx].ano;
			this.datas_swiper[idx].dias = datas[idx].dias;
			this.datas_swiper[idx].atual = datas[idx].atual;
		}
	}

	iniciarEventosSwiper() {
		this.swiper = document.querySelector('swiper-container')!.swiper;
		this.swiper.on('slideNextTransitionStart', () => {
			this.slide_atual = this.slide_atual === 2 ? 0 : this.slide_atual + 1;
			this.calendarioService.atualizarDatasLoop(this.slide_atual, true);
		});
		this.swiper.on('slidePrevTransitionStart', () => {
			this.slide_atual = this.slide_atual === 0 ? 2 : this.slide_atual - 1;
			this.calendarioService.atualizarDatasLoop(this.slide_atual, false);
		});
	}

	selecionarData(dia: Dia, mes: Mes) {
		if (!dia.mes_atual) {
			if (dia.dia > 15) {
				this.calendarioService.data_selecionada.next({ dia: dia.dia, mes: mes.mes === 0 ? 11 : mes.mes - 1, ano: mes.mes === 0 ? mes.ano - 1 : mes.ano });
				this.swiper.slidePrev();
			} else {
				this.calendarioService.data_selecionada.next({ dia: dia.dia, mes: mes.mes === 11 ? 0 : mes.mes + 1, ano: mes.mes === 11 ? mes.ano + 1 : mes.ano });
				this.swiper.slideNext();
			}
		} else this.calendarioService.data_selecionada.next({ dia: dia.dia, mes: mes.mes, ano: mes.ano });
	}
}
