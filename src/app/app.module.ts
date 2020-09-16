import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListadoClientesComponent } from './pages/listado-clientes/listado-clientes.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AgregarClienteComponent } from './pages/agregar-cliente/agregar-cliente.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { CardComponent } from './components/card/card.component';
import { PreciosComponent } from './pages/precios/precios.component';
import { InscripcionComponent } from './pages/inscripcion/inscripcion.component';
import { SeleccionarClienteComponent } from './components/seleccionar-cliente/seleccionar-cliente.component';
import { ListaInscripcionesComponent } from './pages/lista-inscripciones/lista-inscripciones.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SpinnerComponent,
    EncabezadoComponent,
    ListadoClientesComponent,
    AgregarClienteComponent,
    CardComponent,
    PreciosComponent,
    InscripcionComponent,
    SeleccionarClienteComponent,
    ListaInscripcionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ProgressbarModule.forRoot(),
    FormsModule,
    BsDropdownModule.forRoot(),
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase)

  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
