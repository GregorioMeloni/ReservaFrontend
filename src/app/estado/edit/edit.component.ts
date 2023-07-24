import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Estado } from 'src/app/model/types';
import { EstadoService } from 'src/app/service/estado.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  estado: Estado = {
    id: 0,
    nombre: '',
    descripcion: '',
    color: ''
  };
  nombreError: boolean = false;
  descripcionError: boolean = false;
  colorError: boolean = false;

  constructor(private router: Router, private service: EstadoService) {}

  ngOnInit() {
    this.Editar();
  }
  //Botón editar del listar
  Editar() {
    let id = Number(localStorage.getItem('id') || '');
    this.service.getEstadoId(id).subscribe(data => {
      this.estado = data;
    });
  }
  //Botón Actualizar del Form
  actualizar(estado: Estado) {
    if (!this.validarCampos()) {
      return;
    }

    this.service.updateEstado(this.estado).subscribe(data => {
      this.estado = data;
      alert('Se ha actualizado');
      this.router.navigate(['listar-estados']);
    });

  }
  //Validación Campos Forms
  validarCampos(): boolean {
    let isValid = true;

    if (!this.estado.nombre) {
      this.nombreError = true;
      isValid = false;
    } else {
      this.nombreError = false;
    }

    if (!this.estado.descripcion) {
      this.descripcionError = true;
      isValid = false;
    } else {
      this.descripcionError = false;
    }

    if (!this.estado.color || this.estado.color.length > 7) {
      this.colorError = true;
      isValid = false;
    } else {
      this.colorError = false;
    }

    this.estado.color = this.estado.color.toUpperCase();
    this.estado.nombre = this.estado.nombre.trim();

    return isValid;
  }
}
