import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginUsuarioComponent} from './components/login-usuario/login-usuario.component';
import { ListadoVuelosComponent } from './components/listado-vuelos/listado-vuelos.component';
import { BarraHerramientasComponent } from './components/barra-herramientas/barra-herramientas.component';
const routes: Routes = [
  { path: '' , redirectTo :  '/login',pathMatch : 'full' },
  { path: 'login', component: LoginUsuarioComponent },
  { path: 'paginaPrincipal', component: BarraHerramientasComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
