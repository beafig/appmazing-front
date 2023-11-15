import { Component, OnInit } from "@angular/core";
import { ContactsService } from "../contacts.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-contact-home",
  templateUrl: "./contact-home.component.html",
  styleUrls: ["./contact-home.component.css"],
})
export class ContactHomeComponent implements OnInit {
  // contacts es un array de cualquier tipo (any), que es donde ser guardarán los datos que recibimos de la BD
  contacts: any = [];

  // al constructor le pasamos por parámetros el servicio donde está definido el método y el router, que es un elemento necesario para que funcione el link de cada elemento
  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) {}

  // método inicial al entrar en esta URL, viene de contacts.service, el método es getContacts y recibe data, que son todos los datos de nuestra base de datos
  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((data) => {
      // en el array contacts guardamos data
      this.contacts = data;
    });
  }

  // método para acceder al detalle de cada contacto, para ello creamos el método, que es un evento click al que llamamos en el elemento <tr> que define las filas de nuestra tabla, recibe por parámetros la fila sobre la que hemos clicado e indicamos que nos lleve a la nueva url que será: /contact/id de la fila
  openDetailForm(row: any) {
    this.router.navigate(["/contact", row.id]);
  }

  // solo necesitamos el id, podríamos poner contact.id pero lo cogemos directamente en el html en lugar de aquí
  editContactDetail(contact: any) {
    this.router.navigate(["/contact/edit", contact]);
  }

  // método para ordenar por nombre de forma ascendente, uso el Spread Operator [...array], ya que si modifico directamente el array contacts Angular no detecta el cambio y no renderiza de nuevo el componente
  sortByNameAsc() {
    this.contacts = [...this.contacts];
    this.contacts.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  sortByNameDesc() {
    this.contacts = [...this.contacts];
    this.contacts.sort((a, b) => {
      return b.name.localeCompare(a.name);
    });
  }
  // aquí definimos todas las columnas que va a tener nuestra table
  displayedColumns: string[] = [
    "id",
    "name",
    "first_surname",
    "second_surname",
    "phone_number",
    "email",
    "actions",
  ];
}
