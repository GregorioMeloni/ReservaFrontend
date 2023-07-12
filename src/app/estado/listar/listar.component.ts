import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Estado } from 'src/app/Modelo/Estado';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent {
  filtroColumna = ''; // Valor inicializado para 'filtroColumna'
  valorBusqueda = ''; // Valor inicializado para 'valorBusqueda'
  ordenSeleccionado = ''; // Valor inicializado para el orden
  columnaSeleccionada = ''; // Valor inicializado para la columna de orden
  estados: Estado[];
  paginaActual = 0; // Página actual seleccionada
  elementosPorPagina = 2; // Número de elementos por página
  totalPaginas = 0; // Total de páginas disponibles

  constructor(private service: ServiceService, private router: Router) {
    this.estados = [];
  }

  ngOnInit() {
    this.getEstados();
  }
  
  Nuevo(){
    this.router.navigate(["add"]);
  }

  getEstados() {
    this.service.getEstados()
      .subscribe(data => {
        this.estados = data.content;
        this.totalPaginas = Math.ceil(data.content.length / this.elementosPorPagina);
        console.log(data);
      });
  }

  Editar(estado: Estado): void {
    localStorage.setItem('id', estado.id.toString());
    this.router.navigate(['edit']);
  }

  Delete(estado: Estado) {
    this.service.deleteEstado(estado)
      .subscribe(data => {
        this.estados = this.estados.filter(e => e !== estado);
      });
    alert('Estado eliminado');
    location.reload();
  }

  aplicarFiltro() {
    if (this.filtroColumna && this.valorBusqueda) {
      if (this.filtroColumna === 'id') {
        this.service.buscarEstadoPorId(Number(this.valorBusqueda))
          .subscribe(data => {
            this.estados = [data];
            this.totalPaginas = 1;
            console.log(data);
          });
      } else {
        this.service.buscarEstados(this.filtroColumna, this.valorBusqueda)
          .subscribe(data => {
            this.estados = data.content;
            this.totalPaginas = Math.ceil(data.content.length / this.elementosPorPagina);
            console.log(data);
          });
      }
    } else {
      this.getEstados();
    }
  }

  limpiarFiltro() {
    this.filtroColumna = '';
    this.valorBusqueda = '';
    this.getEstados();
  }

  aplicarOrden() {
    this.service.ordenarEstados(this.columnaSeleccionada, this.ordenSeleccionado)
      .subscribe(data => {
        this.estados = data.content;
        this.totalPaginas = Math.ceil(data.content.length / this.elementosPorPagina);
        console.log(data);
      });
  }

  limpiarOrden() {
    this.columnaSeleccionada = '';
    this.ordenSeleccionado = '';
    this.getEstados();
  }

  irAPagina(pagina: number) {
    this.paginaActual = pagina;
    this.aplicarFiltro(); // O llama a this.aplicarOrden() si corresponde
  }

  paginasTotales() {
    return Array(this.totalPaginas).fill(0).map((x, i) => i);
  }
}
