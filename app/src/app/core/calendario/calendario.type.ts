export interface DiaSemana {
	letra: string;
	simplificado: string;
	completo: string;
}

export interface MesAno {
	simplificado: string;
	completo: string;
}

export interface Dia {
	dia: number;
	dia_semana: number; // 0 a 6
	mes_atual: boolean;
}

export interface Mes {
	mes: number; // 0 a 11
	dias: Dia[];
	ano: number;
	atual: boolean;
}

export interface DataSimples {
	dia: number;
	mes: number;
	ano: number;
}

export const dia_semana: DiaSemana[] = [
	{ letra: 'D', simplificado: 'Dom', completo: 'Domingo' },
	{ letra: 'S', simplificado: 'Seg', completo: 'Segunda-feira' },
	{ letra: 'T', simplificado: 'Ter', completo: 'Terça-feira' },
	{ letra: 'Q', simplificado: 'Qua', completo: 'Quarta-feira' },
	{ letra: 'Q', simplificado: 'Qui', completo: 'Quinta-feira' },
	{ letra: 'S', simplificado: 'Sex', completo: 'Sexta-feira' },
	{ letra: 'S', simplificado: 'Sab', completo: 'Sábado' },
];

export const meses: MesAno[] = [
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
