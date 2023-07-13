import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Estado } from 'src/app/Modelo/Estado';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  estado: Estado = new Estado();
  nombreError: boolean = false;
  descripcionError: boolean = false;
  colorError: boolean = false;

  constructor(private router: Router, private service: ServiceService) {}

  ngOnInit() {
    this.Editar();
  }

  Editar() {
    let id = Number(localStorage.getItem('id') || '');
    this.service.getEstadoId(id).subscribe(data => {
      this.estado = data;
    });
  }

  Actualizar(estado: Estado) {
    if (!this.validarCampos()) {
      return;
    }

    this.service.updateEstado(this.estado).subscribe(data => {
      this.estado = data;
      alert('Se ha actualizado');
      this.router.navigate(['listar']);
    });
  }

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

    if (!this.estado.color || this.estado.color.length > 6) {
      this.colorError = true;
      isValid = false;
    } else {
      this.colorError = false;
    }

    return isValid;
  }
}
