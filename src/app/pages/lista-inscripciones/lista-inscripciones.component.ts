import { Component, OnInit } from '@angular/core';
import { InscripcionesService } from '../../services/inscripciones.service';

@Component({
  selector: 'app-lista-inscripciones',
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.scss']
})
export class ListaInscripcionesComponent implements OnInit {

  constructor(public inscripcionesService: InscripcionesService) { }

  ngOnInit(): void {
  }

}
