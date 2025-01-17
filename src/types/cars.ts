export interface CarBrand {
  codigo: string;
  nome: string;
}

export interface CarModelYear {
  codigo: string;
  nome: string;
}

export interface CarModel {
  codigo: number;
  nome: string;
}

export interface ModelResponse {
  modelos: CarModel[];
}
