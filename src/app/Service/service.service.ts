import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado } from '../Modelo/Estado';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http: HttpClient) { }
  Url = 'http://localhost:9090/api/v1/';

  getEstados() {
    return this.http.get<any>(this.Url + 'estado?page=0&sort=id,asc');
  }

  createEstado(estado: Estado) {
    return this.http.post<Estado>(this.Url + 'estado', estado);
  }

  getEstadoId(id: number) {
    return this.http.get<Estado>(this.Url + 'estado/' + id);
  }

  updateEstado(estado: Estado) {
    return this.http.put<Estado>(this.Url + 'estado/' + estado.id, estado);
  }

  deleteEstado(estado: Estado) {
    return this.http.delete<Estado>(this.Url + 'estado/' + estado.id);
  }

  buscarEstados(columna: string, valor: string) {
    const url = `${this.Url}estado?${columna}=${valor}&page=0&sort=id,asc`;
    return this.http.get<any>(url);
  }

  buscarEstadoPorId(id: number) {
    return this.http.get<Estado>(this.Url + 'estado/' + id);
  }

  ordenarEstados(columna: string, orden: string) {
    const url = `${this.Url}estado?page=0&sort=${columna},${orden}`;
    return this.http.get<any>(url);
  }
}