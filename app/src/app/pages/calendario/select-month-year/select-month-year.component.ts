import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { IonButton, IonButtons, IonFooter, IonHeader, IonPicker, IonPickerColumn, IonPickerColumnOption, IonToolbar, ModalController } from '@ionic/angular/standalone';

@Component({
	selector: 'app-select-month-year',
	templateUrl: 'select-month-year.component.html',
	standalone: true,
	imports: [IonHeader, IonFooter, IonButton, IonButtons, IonPicker, IonPickerColumn, IonPickerColumnOption, IonToolbar, CommonModule],
})
export class SelectMonthYearComponent {
	@Output() do_select = new EventEmitter<{ mes: number; ano: number }>();

	private data_hoje: Date = new Date();
	data_selecionada: { mes: number; ano: number } = { mes: this.data_hoje.getMonth(), ano: this.data_hoje.getFullYear() };

	meses: { id: number; titulo: string }[] = [
		{ id: 0, titulo: 'Janeiro' },
		{ id: 1, titulo: 'Fevereiro' },
		{ id: 2, titulo: 'Março' },
		{ id: 3, titulo: 'Abril' },
		{ id: 4, titulo: 'Maio' },
		{ id: 5, titulo: 'Junho' },
		{ id: 6, titulo: 'Julho' },
		{ id: 7, titulo: 'Agosto' },
		{ id: 8, titulo: 'Setembro' },
		{ id: 9, titulo: 'Outubro' },
		{ id: 10, titulo: 'Novembro' },
		{ id: 11, titulo: 'Dezembro' },
	];
	anos: number[] = Array.from({ length: 401 }, (_, i) => this.data_selecionada.ano - 200 + i);

	constructor(private modalController: ModalController) {}

	atualizarMes = (mes: any) => (this.data_selecionada.mes = mes);
	atualizarAno = (ano: any) => (this.data_selecionada.ano = ano);
	fecharModal = () => this.modalController.dismiss();

	confirmarSelecao() {
		this.do_select.emit(this.data_selecionada);
		this.fecharModal();
	}
}
