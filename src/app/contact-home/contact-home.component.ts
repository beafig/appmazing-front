import { Component} from '@angular/core';

// copiado de la librería angular material (table)
// definimos las columnas de nuestra tabla que serán las propiedades de nuestros objetos
export interface Contact {
  id: number;
  name: string;
  first_surname: string;
  second_surname: string;
  phone_number: number;
  email: string
}

const ELEMENT_DATA: Contact[] = [
 {id:1, name: 'Bea', first_surname: 'López', second_surname:'García', phone_number: 652271459, email:'bea@mymail.com'},
 {id:2, name: 'Marga', first_surname: 'Castro', second_surname:'Gomez', phone_number: 652271459, email:'marga@mymail.com'},
 {id:3, name: 'Jose', first_surname: 'Martinez', second_surname:'Fernández', phone_number: 652271459, email:'jose@mymail.com'},
 {id:4, name: 'Sonia', first_surname: 'Cuevas', second_surname:'Ponce', phone_number: 652271459, email:'sonia@mymail.com'},
 {id:5, name: 'Iván', first_surname: 'Muñoz', second_surname:'Alonso', phone_number: 652271459, email:'ivan@mymail.com'},
 {id:6, name: 'Ángela', first_surname: 'Dominguez', second_surname:'Iglesias', phone_number: 652271459, email:'angela@mymail.com'},
 {id:7, name: 'Iago', first_surname: 'Lago', second_surname:'Hernández', phone_number: 652271459, email:'iago@mymail.com'},
 {id:8, name: 'Leire', first_surname: 'Fernández', second_surname:'Rendo', phone_number: 652271459, email:'leire@mymail.com'},
 {id:9, name: 'Javi', first_surname: 'Rodriguez', second_surname:'Rivera', phone_number: 652271459, email:'javi@mymail.com'},
 {id:10, name: 'Lorena', first_surname: 'Troncoso', second_surname:'Pereira', phone_number: 652271459, email:'lorena@mymail.com'}
];
// hasta aquí ^

@Component({
  selector: 'app-contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: ['./contact-home.component.css']
})
export class ContactHomeComponent {
  // copiado de la librería
  displayedColumns: string[] = ['id', 'name', 'first_surname', 'second_surname', 'phone_number', 'email'];
  contacts = ELEMENT_DATA;
  // hasta aquí ^
}
