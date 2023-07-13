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
  filtroAplicado = false;
  valorBusqueda = ''; // Valor inicializado para 'valorBusqueda'
  ordenSeleccionado = ''; // Valor inicializado para el orden
  ordenAplicado = false;
  columnaSeleccionada = ''; // Valor inicializado para la columna de orden
  estados: Estado[];
  paginaActual = 0; // Página actual seleccionada
  elementosPorPagina = 3; // Número de elementos por página
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

  aplicarFiltro(){
    this.filtroAplicado = true;
    this.fetch();
  }

  fetch() {

    if (this.filtroColumna === 'id') {
      if(this.filtroAplicado){
        this.paginaActual = 0;
        this.service.getEstadoId(Number(this.valorBusqueda))
        .subscribe(data => {
          this.estados = [data];
          this.totalPaginas = 1;
        });
      }else{
        this.getEstados();
      }
    } else {
      this.service.buscarEstados(this.filtroColumna, this.valorBusqueda, this.columnaSeleccionada,this.ordenSeleccionado,
        this.filtroAplicado, this.ordenAplicado)
        .subscribe(data => {
          this.estados = data.content;
          this.totalPaginas = Math.ceil(data.content.length / this.elementosPorPagina);
        });
    }
  }

  limpiarFiltro() {
    this.filtroColumna = '';
    this.valorBusqueda = '';
    this.filtroAplicado = false;
    this.getEstados();
  }

  aplicarOrden(){
    this.ordenAplicado = true;
    this.fetch();
  }

  limpiarOrden() {
    this.columnaSeleccionada = '';
    this.ordenSeleccionado = '';
    this.ordenAplicado = false;
    this.getEstados();
  }

  irAPagina(pagina: number) {
    this.paginaActual = pagina;
    this.fetch(); // O llama a this.aplicarOrden() si corresponde
  }

  paginasTotales() {
    return Array(this.totalPaginas).fill(0).map((x, i) => i);
  }
}
