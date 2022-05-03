import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDatosComponent } from './components/create-datos/create-datos.component';
//import { compileFunction } from 'vm';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';
import { ListDatosComponent } from './components/list-datos/list-datos.component';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';

const routes: Routes = [
 // {path: '', redirectTo: 'list-empleados', pathMatch: 'full'},
  {path: 'list-empleados', component: ListEmpleadosComponent},
  {path: 'create-empleados', component: CreateEmpleadoComponent},
  {path: 'edit-empleados/:id', component: CreateEmpleadoComponent},
  {path: 'create-datos/:id', component: CreateDatosComponent},
  {path: 'list-datos', component: ListDatosComponent}
 // {path: '**', redirectTo:'list-empleados', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
