import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonToolbar } from '@ionic/angular/standalone';
import { CalendarioService } from 'src/app/core/calendario/calendario.service';
import { DataSimples, Dia, DiaSemana, Mes, MesAno } from 'src/app/core/calendario/calendario.type';
import { Swiper } from 'swiper/types';

@Component({
	selector: 'app-calendario',
	templateUrl: 'calendario.page.html',
	styleUrl: 'calendario.scss',
	standalone: true,
	imports: [IonContent, IonToolbar, IonHeader, CommonModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalendarioPage implements OnInit {
	dias_semana!: DiaSemana[];
	meses!: MesAno[];

	private swiper!: Swiper;
	datas_swiper!: Mes[];
	slides_swiper = [0, 1, 2];
	slide_atual: number = 0;

	data_hoje: Date = new Date();
	data_simples_hoje: DataSimples = { dia: this.data_hoje.getDate(), mes: this.data_hoje.getMonth(), ano: this.data_hoje.getFullYear() };
	data_selecionada!: DataSimples;

	constructor(private calendarioService: CalendarioService) {
		this.dias_semana = calendarioService.dia_semana;
		this.meses = calendarioService.meses;
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

	atualizarInjecaoDatas(datas: Mes[]) {
		this.datas_swiper[0].mes = datas[0].mes;
		this.datas_swiper[0].ano = datas[0].ano;
		this.datas_swiper[0].dias = datas[0].dias;
		this.datas_swiper[0].atual = datas[0].atual;

		this.datas_swiper[1].mes = datas[1].mes;
		this.datas_swiper[1].ano = datas[1].ano;
		this.datas_swiper[1].dias = datas[1].dias;
		this.datas_swiper[1].atual = datas[1].atual;

		this.datas_swiper[2].mes = datas[2].mes;
		this.datas_swiper[2].ano = datas[2].ano;
		this.datas_swiper[2].dias = datas[2].dias;
		this.datas_swiper[2].atual = datas[2].atual;
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
