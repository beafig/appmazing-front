import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.css']
})
export class ContactNewComponent implements OnInit {
name:string;
first_surname: string;
second_surname:string;
phone_number: number;
email:string;

  constructor(private router: Router, private contactsService: ContactsService) { }

  ngOnInit() {
  }

  // handler del botón de submit, creamos el contacto recogiendo todos los valores del form, y llamamos al método para volver a la tabla
  async newContact(){
    const contact= {
      name: this.name,
      first_surname: this.first_surname,
      second_surname: this.second_surname,
      phone_number: this.phone_number,
      email: this.email
    }
      if(contact.name === undefined || contact.first_surname === undefined || contact.phone_number === undefined || contact.email === undefined){
        alert('Todos los campos son obligarios excepto el segundo apellido')
        console.log(contact.name);
        console.log(contact.first_surname);
        console.log(contact.phone_number);
        console.log(contact.email);
        
      } else {
        this.contactsService.newContact(contact);
        await this.navigateToHome();
      }
  }
// handler del botón cancelar
  cancelInsert(){
    this.navigateToHome();
  }

  //método para volver a la tabla de contactos, tanto cuando crees un nuevo contacto como cuando le des al botón de cancelar, llamaremos a este método en la handler del los botones
  navigateToHome(){
    this.router.navigate(['/contacts'])
  }
}
