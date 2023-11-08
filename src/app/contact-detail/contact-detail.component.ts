import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})

export class ContactDetailComponent implements OnInit {

// aquí se guarda el contacto obtenido del servicio
  contact: any;

  // route: ActivedRoute para recoger el parámetro id de la url
  constructor(private contactsService: ContactsService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.contactsService.getContact(this.route.snapshot.params['id']).subscribe(data =>{
      this.contact = data;
    })
  }

}
