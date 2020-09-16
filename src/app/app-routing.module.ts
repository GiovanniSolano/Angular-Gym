import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoClientesComponent } from './pages/listado-clientes/listado-clientes.component';
import { AgregarClienteComponent } from './pages/agregar-cliente/agregar-cliente.component';
import { PreciosComponent } from './pages/precios/precios.component';
import { InscripcionComponent } from './pages/inscripcion/inscripcion.component';
import { ListaInscripcionesComponent } from './pages/lista-inscripciones/lista-inscripciones.component';


const routes: Routes = [
  {
    path: '', component: InscripcionComponent
  },
  {
    path: 'inscripcion', component: InscripcionComponent
  },
  {
    path: 'listado-clientes', component: ListadoClientesComponent
  },
  {
    path: 'agregar-cliente/:idCliente', component: AgregarClienteComponent
  },
  {
    path: 'agregar-cliente', component: AgregarClienteComponent
  },
  {
    path: 'precios', component: PreciosComponent
  },
  {
    path: 'listado-inscripciones', component: ListaInscripcionesComponent
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'inscripcion'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
