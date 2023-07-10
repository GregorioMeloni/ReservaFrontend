import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Estado } from '../Modelo/Estado';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }
  Url='http://localhost:9090/api/v1/estado?page=0&sort=id,asc';
  getEstados(){
    return this.http.get<Estado[]>(this.Url);
  }

  createEstado(estado:Estado){
return this.http.post<Estado>(this.Url,estado);
  }
}
