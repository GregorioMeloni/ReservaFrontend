import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estado } from 'src/app/model/types';
import { EstadoService } from 'src/app/service/estado.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar-estado.component.html',
  styleUrls: ['./listar-estado.component.scss']
})
export class ListarComponent implements OnInit {
  filtroColumna = '';
  valorBusqueda = '';
  sortDir = 'asc';
  sortColumn = 'id';
  estados: Estado[] = [];
  paginaActual = 0;
  totalPaginas = 0;
  mostrarErrorValorBusqueda = false;

  constructor(private estadoService: EstadoService, private router: Router) {}

  ngOnInit() {
    this.getEstados();
  }

  nuevo() {
    this.router.navigate(['add']);
  }

  getEstados() {
    this.estadoService
      .getEstados(this.paginaActual, this.sortColumn, this.sortDir, this.filtroColumna, this.valorBusqueda)
      .subscribe(data => {
        this.estados = data.content;
        this.totalPaginas = data.totalPages;
      });
  }

  editarEstado(estado: Estado): void {
    localStorage.setItem('id', estado.id.toString());
    this.router.navigate(['edit']);
  }

  deleteEstado(estado: Estado) {
    this.estadoService.deleteEstado(estado);
    alert('Se ha eliminado el estado con id: ' + estado.id);
    this.getEstados();
  }

  aplicarFiltro() {
    this.getEstados();
  }

  aplicarOrden() {
    this.getEstados();
  }

  limpiarFiltro() {
    this.filtroColumna = '';
    this.valorBusqueda = '';
    this.mostrarErrorValorBusqueda = false;
    this.getEstados();
  }

  limpiarOrden() {
    this.sortDir = 'asc';
    this.sortColumn = 'id';
    this.getEstados();
  }

  getArrayPaginas() {
    return Array.from({ length: this.totalPaginas }, (_, i) => i);
  }

  irAPagina(pagina: number) {
    this.paginaActual = pagina;
    this.getEstados();
  }
}