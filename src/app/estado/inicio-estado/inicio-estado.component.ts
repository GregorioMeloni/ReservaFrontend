import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-estado',
  templateUrl: './inicio-estado.component.html',
  styleUrls: ['./inicio-estado.component.scss']
})
export class InicioEstadoComponent {
  constructor(private router:Router){}
  Listar(){
    this.router.navigate(["listar"]);
  }
  Nuevo(){
    this.router.navigate(["add"]);
  }
}
