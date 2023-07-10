import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './estado/listar/listar.component';
import { AddComponent } from './estado/add/add.component';
import { EditComponent } from './estado/edit/edit.component';
import { HomeComponent } from './home/home.component';
import { InicioEstadoComponent } from './estado/inicio-estado/inicio-estado.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio-estado', component: InicioEstadoComponent },
  {path: 'listar', component: ListarComponent},
  {path: 'add', component: AddComponent},
  {path: 'edit', component: EditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
