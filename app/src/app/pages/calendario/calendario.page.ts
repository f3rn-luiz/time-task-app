import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonToolbar } from '@ionic/angular/standalone';
import { CalendarioService } from 'src/app/core/calendario/calendario.service';
import { Dia, DiaSemana, Mes, MesAno } from 'src/app/core/calendario/calendario.type';

@Component({
	selector: 'app-calendario',
	templateUrl: 'calendario.page.html',
	standalone: true,
	imports: [IonContent, IonToolbar, IonHeader, CommonModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalendarioPage implements OnInit {
	dias_semana!: DiaSemana[];
	calendario!: Mes[];

	data_hoje: Date = new Date();
	data_seletor!: Date;
	data_selecionada!: Date;

	meses!: MesAno[];

	slide_atual: number = 1;

	constructor(private calendarioService: CalendarioService) {
		this.dias_semana = calendarioService.dia_semana;
		this.meses = calendarioService.meses;
		calendarioService.calendario.subscribe({
			next: (c) => {
				if (c) this.calendario = c;
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
			if (swiper.activeIndex === swiper.slides.length - 1) swiper.addSlide(swiper.slides.length, '<swiper-slide class="flex h-full items-center justify-center border border-blue-500 bg-gray-500">hehe</swiper-slide>');
			else if (swiper.activeIndex === 0) swiper.addSlide(0, '<swiper-slide class="flex h-full items-center justify-center border border-blue-500 bg-gray-500">hehe</swiper-slide>');
			this.slide_atual = swiper.activeIndex;
			this.selecionarData({ dia: 1, dia_semana: 0, mes_atual: true }, { ...this.calendario[this.slide_atual] });
			setTimeout(() => (swiper.allowTouchMove = true), 500);
		});
	}

	selecionarData(dia: Dia, mes: Mes) {
		if (dia.mes_atual) this.calendarioService.selecionarData(dia, mes);
	}
}
