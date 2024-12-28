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
