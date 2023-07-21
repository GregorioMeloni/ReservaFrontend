import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { Cliente, Page } from '../model/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  // URL base
  private API_URL = environment.apiUrl + '/cliente';

  constructor(private http: HttpClient) { }

  // Trae todos los estados -> GET All
  getClientes(page: number, sortBy: string, sortDir: string, filterColumn: string, filter: string): Observable<Page<Cliente>> {
    // Default values
    let url = this.API_URL;

    // Paginación
    url = url + '?page=' + page;

    // Si no hay sorting
    if (sortBy == null || sortBy == undefined || sortDir == null || sortDir == undefined) {
      url = url + '&sort=id,asc';
    } else {
      url = url + '&sort=' + sortBy + ',' + sortDir;
    }

    // Tamaño de página
    //url = url + '&size=5';

    // Añadir filtros
    if (filterColumn != '' && filter != '') {
      url = url + '&' + filterColumn + '=' + filter;
    }
    
    // Devolver
    return this.http.get<Page<Cliente>>(url);
  }

}
