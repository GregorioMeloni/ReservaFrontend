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
  estado:Estado=new Estado();
  constructor(private router:Router, private service:ServiceService){}
  ngOnInit(){
    this.Editar()
  }
  Editar(){
    let id=Number(localStorage.getItem("id")|| "");
    this.service.getEstadoId(id)
    .subscribe(data=>{
      this.estado=data;
    })
  }
  Actualizar(estado:Estado){
    this.service.updateEstado(this.estado)
    .subscribe(data=>{
      this.estado=data;
      alert("Se ha actualizado");
      this.router.navigate(["listar"]);
    })
  }
}
