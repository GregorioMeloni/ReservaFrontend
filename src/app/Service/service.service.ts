import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado } from '../Modelo/Estado';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http: HttpClient) { }
  //Url común a quienes lo utilicen
  Url = 'http://localhost:9090/api/v1/';

  //Trae todos los estados -> GET All
  getEstados() {
    return this.http.get<any>(this.Url + 'estado?page=0&sort=id,asc');
  }

  //Creación de nuevo estado -> POST New
  createEstado(estado: Estado) {
    return this.http.post<Estado>(this.Url + 'estado', estado);
  }

  //Trae el estado por id -> GET ByID
  getEstadoId(id: number) {
    return this.http.get<Estado>(this.Url + 'estado/' + id);
  }

  //Actualizacion del estado -> PUT Edit
  updateEstado(estado: Estado) {
    return this.http.put<Estado>(this.Url + 'estado/' + estado.id, estado);
  }

  //Eliminación estado -> DEL Delete
  deleteEstado(estado: Estado) {
    return this.http.delete<Estado>(this.Url + 'estado/' + estado.id);
  }

  //Búsqueda de estados para filtros y ordenamiento
  buscarEstados(columnaFiltro: string, valor: any,columnaOrden: string, orden: string, filtroAplicado: boolean, ordenAplicado: boolean) {
    let url = this.Url+"estado?page=0";
    if(filtroAplicado){
      url = url + `&${columnaFiltro}=${valor}`;
    }
    if(ordenAplicado){
      url = url + `&sort=${columnaOrden},${orden}`;
    }else{
      url = url + `&sort=id,asc`;
    }
    return this.http.get<any>(url);
  }

}