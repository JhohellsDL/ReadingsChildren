export interface Question {
  id: string;
  pregunta: string;
  opciones: string[];
  respuesta_correcta: number;
  puntos: number;
}

export interface Story {
  id: string;
  titulo: string;
  categoria: string;
  descripcion: string;
  imagen: string;
  tiempo_lectura: string;
  contenido: string;
  preguntas: Question[];
  puntos_totales: number;
}

export interface CuentosResponse {
  version: number;
  cuentos: Story[];
}
