import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-listar-reserva',
  templateUrl: './listar-reserva.component.html',
  styleUrls: ['./listar-reserva.component.scss']
})
export class ListarReservaComponent {
  filtroColumna = '';
  filtroAplicado = false;
  valorBusqueda = '';
  ordenSeleccionado = '';
  ordenAplicado = false;
  columnaSeleccionada = '';
  estados: Estado[];
  paginaActual = 0;
  elementosPorPagina = 3;
  totalPaginas = 0;
  mostrarErrorValorBusqueda = false;

  constructor(private service: ServiceService, private router: Router) {
    this.estados = [];
  }

  ngOnInit() {
    this.getEstados();
  }

  //Botón Nuevo redirije a componente add
  Nuevo() {
    this.router.navigate(["add"]);
  }

  //Traigo todos los estados a la tabla
  getEstados() {
    this.service.getEstados()
      .subscribe(data => {
        this.estados = data.content;
        this.totalPaginas = Math.ceil(data.content.length / this.elementosPorPagina);
      });
  }

  //Botón Editar
  Editar(estado: Estado): void {
    localStorage.setItem('id', estado.id.toString());
    this.router.navigate(['edit']);
  }

  //Botón Eliminar
  Delete(estado: Estado) {
    this.service.deleteEstado(estado)
      .subscribe(data => {
        this.estados = this.estados.filter(e => e !== estado);
      });
    alert('Estado eliminado');
    location.reload();
  }

  //Validación campo de valor de búsqueda y aplicaciónd del filtro
  aplicarFiltro() {
    if (this.valorBusqueda.trim() !== '') {
      this.filtroAplicado = true;
      this.mostrarErrorValorBusqueda = false;
      this.fetch();
    } else {
      this.mostrarErrorValorBusqueda = true;
    }
  }

  //Se seleccionó un orden
  aplicarOrden() {
    this.ordenAplicado = true;
    this.fetch();
  }

  //Búsqueda en filtros y ordenamiento
  fetch() {
    if (this.filtroColumna === 'id') {
      if (this.filtroAplicado) {
        this.paginaActual = 0;
        this.service.getEstadoId(Number(this.valorBusqueda))
          .subscribe(data => {
            this.estados = [data];
            this.totalPaginas = 1;
          });
      } else {
        this.getEstados();
      }
    } else {
      this.service.buscarEstados(this.filtroColumna, this.valorBusqueda, this.columnaSeleccionada, this.ordenSeleccionado,
        this.filtroAplicado, this.ordenAplicado)
        .subscribe(data => {
          this.estados = data.content.filter((estado: Estado) => {
            return (
              estado.nombre.toLowerCase().startsWith(this.valorBusqueda.toLowerCase()) ||
              estado.descripcion.toLowerCase().startsWith(this.valorBusqueda.toLowerCase()) ||
              estado.color.toLowerCase().startsWith(this.valorBusqueda.toLowerCase())
            );
          });
  
          this.totalPaginas = Math.ceil(this.estados.length / this.elementosPorPagina);
        });
    }
  }

  //Botón Limpiar filtro
  limpiarFiltro() {
    this.filtroColumna = '';
    this.valorBusqueda = '';
    this.filtroAplicado = false;
    this.mostrarErrorValorBusqueda = false;
    this.getEstados();
  }

  //Botón Limpiar Orden
  limpiarOrden() {
    this.columnaSeleccionada = '';
    this.ordenSeleccionado = '';
    this.ordenAplicado = false;
    this.getEstados();
  }

  //Pasaje entre páginas
  irAPagina(pagina: number) {
    this.paginaActual = pagina;
    this.fetch();
  }
  //Cantidad de páginas
  paginasTotales() {
    return Array(this.totalPaginas).fill(0).map((x, i) => i);
  }


  parseDate(date: Date): string {
    let dateString: string = date.toString();
    return new Date(dateString).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  parseTime(horaInicio: Date, horaFin: Date): string {
    let horaInicioString: string = horaInicio.toString();
    let horaFinString: string = horaFin.toString();
    return new Date(horaInicioString).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) + 
      " - " + new Date(horaFinString).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }
  parseMinutes(minutes: number): string {
    let hours = Math.floor(minutes / 60);
    let minutesLeft = minutes % 60;
    return hours + ":" + minutesLeft.toString().padStart(2, '0');
  }

}
