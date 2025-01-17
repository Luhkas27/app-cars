import axios from 'axios';

import { CarBrand, ModelResponse } from '~/types/cars';

export async function getCarBrands(): Promise<CarBrand[]> {
  try {
    const { data } = await axios.get<CarBrand[]>(
      'https://parallelum.com.br/fipe/api/v1/carros/marcas'
    );
    return data;
  } catch (error) {
    console.error('Error fetching car brands:', error);
    throw error;
  }
}

export async function getCarModels(brandId: string): Promise<ModelResponse> {
  try {
    const { data } = await axios.get<ModelResponse>(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandId}/modelos`
    );
    return data;
  } catch (error) {
    console.error('Error fetching car models:', error);
    throw error;
  }
}
