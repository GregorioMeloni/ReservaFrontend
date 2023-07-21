import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './estado/listar-estado/listar-estado.component';
import { AddComponent } from './estado/add/add.component';
import { EditComponent } from './estado/edit/edit.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AddReservaComponent } from './reserva/add-reserva/add-reserva.component';
import { EditReservaComponent } from './reserva/edit-reserva/edit-reserva.component';
import { ListarReservaComponent } from './reserva/listar-reserva/listar-reserva.component';

const routes: Routes = [
  //Rutas
  { path: '', component: HomeComponent },
  {path: 'listar-estados', component: ListarComponent},
  {path: 'add', component: AddComponent},
  {path: 'edit', component: EditComponent},
  {path: 'listar-reserva', component: ListarReservaComponent},
  {path: 'add-reserva', component: AddReservaComponent},
  {path: 'edit-reserva', component: EditReservaComponent},
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
