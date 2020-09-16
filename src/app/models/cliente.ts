import { DocumentReference } from '@angular/fire/firestore';
export class Cliente {
    id: string;
    ref: DocumentReference;
    nombre: string;
    apellido: string;
    correo: string;
    fecha_nacimiento: Date;
    imageUrl: string;
    telefono: number;
    visible: boolean;

    constructor() {
        
    }
}