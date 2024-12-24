import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonToolbar } from '@ionic/angular/standalone';
import { CalendarioService } from 'src/app/core/calendario/calendario.service';
import { Dia, DiaSemana, Mes, MesAno } from 'src/app/core/calendario/calendario.type';

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
	datas_loop!: Mes[];

	data_hoje: Date = new Date();
	data_seletor!: Date;
	data_selecionada!: Date;

	meses!: MesAno[];

	slide_atual: number = 0;

	constructor(private calendarioService: CalendarioService) {
		this.dias_semana = calendarioService.dia_semana;
		this.meses = calendarioService.meses;
		calendarioService.datas_loop.subscribe({
			next: (c) => {
				if (c) this.datas_loop = c;
			},
		});
		calendarioService.data_seletor.subscribe({ next: (d) => (this.data_seletor = d) });
		calendarioService.data_selecionada.subscribe({ next: (d) => (this.data_selecionada = d) });
	}

	ngOnInit(): void {
		this.iniciarEventosSwiper();
	}

	iniciarEventosSwiper() {
		const swiper = document.querySelector('swiper-container')!.swiper;
		swiper.on('slideChangeTransitionEnd', () => {
			swiper.allowTouchMove = false;
			if (swiper.activeIndex === swiper.slides.length - 1) this.calendarioService.incrementarCalendario(true);
			else if (swiper.activeIndex === 0) {
				this.calendarioService.incrementarCalendario(false);
				swiper.slideTo(1, 0);
			}
			this.slide_atual = swiper.activeIndex;
			if (this.calendario[this.slide_atual].mes === this.data_hoje.getMonth() && this.calendario[this.slide_atual].ano === this.data_hoje.getFullYear())
				this.selecionarData({ dia: this.data_hoje.getDate(), dia_semana: 0, mes_atual: true }, { ...this.calendario[this.slide_atual] });
			else this.selecionarData({ dia: 1, dia_semana: 0, mes_atual: true }, { ...this.calendario[this.slide_atual] });
			setTimeout(() => (swiper.allowTouchMove = true), 500);
		});
	}

	classeDia(dia: Dia, mes: Mes): string {
		let classe = dia.dia_semana === 0 ? 'dia-domingo' : 'dia-normal';
		classe += dia.mes_atual && mes.ano === this.data_selecionada.getFullYear() && mes.mes === this.data_selecionada.getMonth() && dia.dia === this.data_selecionada.getDate() ? ' dia-selecionado' : '';
		classe += dia.mes_atual ? '' : ' opacity-35 dark:opacity-40';
		return classe;
	}

	classeDiaHoje(dia: Dia, mes: Mes): string {
		if (dia.dia === this.data_hoje.getDate() && mes.mes === this.data_hoje.getMonth() && mes.ano === this.data_hoje.getFullYear()) return 'dia-hoje';
		else return '';
	}

	selecionarData(dia: Dia, mes: Mes) {
		if (dia.mes_atual) this.calendarioService.selecionarData(dia, mes);
	}
}
