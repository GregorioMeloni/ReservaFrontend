import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente, EspacioFisico, Estado, Reserva } from 'src/app/model/types';
import { ClienteService } from 'src/app/service/cliente.service';
import { EspacioFisicoService } from 'src/app/service/espacio-fisico.service';
import { EstadoService } from 'src/app/service/estado.service';
import { ReservaService } from 'src/app/service/reserva.service';

@Component({
  selector: 'app-edit-reserva',
  templateUrl: './edit-reserva.component.html',
  styleUrls: ['./edit-reserva.component.scss']
})
export class EditReservaComponent {
  reserva: Reserva = {
    id: 1,
    fechaHoraInicio: '',
    fechaHoraFin: '',
    comentario: '',
    fechaHoraCreacion: '',
    cliente: {
      id: 1,
      nombre: '',
      apellido: '',
      nroTelefono: '',
      email: '',
      dni: 0,
      rol: {
        id: 1,
        nombre: '',
        descripcion: ''
      }
    },
    motivoReserva: '',
    estado: {
      id: 1,
      nombre: '',
      descripcion: '',
      color: ''
    },
    motivoRechazo: '',
    espacioFisico: {
      id: 1,
      nombre: '',
      capacidad: 0,
      descripcion: '',
      recursos: [],
      habilitado: false
    },
    duracion: 0
  };
  motivoReservaError: boolean = false;
  fechaHoraInicioError: boolean = false;
  fechaHoraFinError: boolean = false;
  clientes: Cliente[] = [];
  espaciosFisicos: EspacioFisico[] = [];
  estados: Estado[]=[];

  constructor(private router: Router, private service: ReservaService, private clienteService: ClienteService, private espacioFisicoService: EspacioFisicoService, private estadoService: EstadoService) {}

  ngOnInit() {
    this.Editar();
    this.getClientes();
    this.getEspaciosFisicos();
    this.getEstados();
  }

  //Botón editar del listar
  Editar() {
    let id = Number(localStorage.getItem('id') || '');
    this.service.getReservaId(id).subscribe(data => {
      this.reserva = data;
    });
    
  }

  //Botón Actualizar del Form
  actualizar() {
    if (!this.validarCampos()) {
      return;
    }

    this.service.updateReserva(this.reserva).subscribe(data => {
      this.reserva = data;
      alert('Se ha actualizado');
      this.router.navigate(['listar-reserva']);
    });

  }

  getClientes() {
    this.clienteService.getClientes(0, "id", "asc", " ", " ").subscribe(
      (data) => {
        this.clientes = data.content;
      },
      (error) => {
        console.error('Error al obtener los clientes:', error);
      }
    );
  }

  getEspaciosFisicos() {
    this.espacioFisicoService.getEspaciosFisicos(0, "id", "asc", " ", " ").subscribe(
      (data) => {
        this.espaciosFisicos = data.content;
      },
      (error) => {
        console.error('Error al obtener los espacios físicos:', error);
      }
    );
  }

  getEstados() {
    this.estadoService.getEstados(0, "id", "asc", " ", " ").subscribe(
      (data) => {
        this.estados = data.content;
      },
      (error) => {
        console.error('Error al obtener los espacios físicos:', error);
      }
    );
  }
  
  //Validación Campos Forms
  validarCampos(): boolean {
    let isValid = true;


    return isValid;
  }
}
