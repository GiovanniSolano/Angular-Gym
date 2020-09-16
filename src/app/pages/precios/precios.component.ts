import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PreciosService } from '../../services/precios.service';
import { Precio } from 'src/app/models/precio';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {

  formularioPrecio: FormGroup;

  constructor(private fb: FormBuilder,
              public preciosService: PreciosService) { }

  ngOnInit(): void {

    this.formularioPrecio = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required]
    });

  }

  agregarPrecio(): void {
    
    this.preciosService.agregar(this.formularioPrecio);
    
  }

  asignar(precio: Precio) {
    this.preciosService.asignarValores(precio, this.formularioPrecio);
  }

  editarPrecio() {

    this.preciosService.editar(this.formularioPrecio);

  }

  limpiar(): void {
    this.formularioPrecio.reset();
    this.preciosService.esEditar = false;
  }


  get nombreValido(): boolean {
    return this.formularioPrecio.get('nombre').invalid  && this.formularioPrecio.get('nombre').touched;
  }
  get costoValido(): boolean {
    return this.formularioPrecio.get('costo').invalid  && this.formularioPrecio.get('costo').touched;
  }
  get duracionValido(): boolean {
    return this.formularioPrecio.get('duracion').invalid  && this.formularioPrecio.get('duracion').touched;
  }
  get tipoDuracionValido(): boolean {
    return this.formularioPrecio.get('tipoDuracion').invalid  && this.formularioPrecio.get('tipoDuracion').touched;
  }

}
