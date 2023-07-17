export interface Page<T> {
  content: T[];
  totalPages: number; 
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
export interface Recurso {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface EspacioFisico {
  id: number;
  nombre: string;
  capacidad: number;
  descripcion: string;
  recursos: Recurso[];
  habilitado: boolean;
}

export interface Estado {
  id: number;
  nombre: string;
  descripcion: string;
  color: string;
}

export interface Role {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  nroTelefono: string;
  email: string;
  dni: number;
  rol: Role;
}

export interface Reserva {
  id: number;
  fechaHoraInicio: Date;
  fechaHoraFin: Date;
  comentario: string;
  fechaHoraCreacion: string;
  cliente: Cliente;
  motivoReserva: string;
  estado: Estado;
  motivoRechazo: string;
  espacioFisico: EspacioFisico;
  duracion: number;
}