import { Component, OnInit } from "@angular/core";
import { ContactsService } from "../contacts.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { ContactDeleteComponent } from "../contact-delete/contact-delete.component";

@Component({
  selector: "app-contact-detail",
  templateUrl: "./contact-detail.component.html",
  styleUrls: ["./contact-detail.component.css"],
})
export class ContactDetailComponent implements OnInit {
  // aquí se guarda el contacto obtenido del servicio
  contact: any;

  // array para guardar todos los contactos de la BD y los ids, necesario para poder ver otros contactos desde el detalle de uno de ellos
  contacts: any = [];
  ids: number[] = [];

  // route: ActivedRoute para recoger el parámetro id de la url
  constructor(
    private contactsService: ContactsService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // la primera línea hace que mi componente esté suscrito a los cambios de ruta, por ello cuando se ejecuta de la función goToPrevious(), se recarga la página directamente y me lleva a la url del contacto seleccionado, sin esta esta línea la página no se refresca automáticamente
    this.route.params.subscribe(() => {
      this.contactsService
        .getContact(this.route.snapshot.params["id"])
        .subscribe((data) => {
          this.contact = data;
        });
    });
  }

  navigateToHome() {
    this.router.navigate(["/contacts"]);
  }

  updateContact() {
    this.router.navigate(["contact/edit", this.route.snapshot.params["id"]]);
  }

  openDeleteDialog(contactId: number, contactName: string): void {
    this.dialog.open(ContactDeleteComponent, {
      data: { contactId: contactId, contactName: contactName },
    });
  }

  // método para obtener los datos de los contactos de la BD, y crear un nuevo array solo con los ids, es una promesa ya que quiero que primero obtenga los datos y luego cree el array, si no creará un array ids vacío hasta que se obtengan los datos
  async createIdsArray(): Promise<number[]> {
    return new Promise((resolve) => {
      this.contactsService.getContacts().subscribe((data) => {
        this.contacts = data;
        this.ids = this.contacts.map((e) => e.id);
        resolve(this.ids);
      });
    });
  }

  // método para ver el detalle del contacto anterior, primero obtengo el array de ids del método anterior
  // obtengo el id del contacto convirtiéndolo a number
  // obtengo el index de ese id con el método findIndex, tengo que trabajar con los index porque los ids no son consecutivos
  // condicional para comprobar si el índice es 0, en cuyo caso me llevará al último elemento del array, que es la longitud del array -1
  async goToPrevious() {
    this.ids = await this.createIdsArray();
    let currentId = parseInt(this.route.snapshot.params["id"]);
    let currentIndex = this.ids.findIndex((id) => {
      return id === currentId;
    });
    if (currentIndex === 0) {
      currentIndex = this.ids.length - 1;
      this.router.navigate(["/contact/", this.ids[currentIndex]]);
    } else {
      this.router.navigate(["/contact/", this.ids[currentIndex - 1]]);
    }
  }

  //condicional para comprobar si estoy en el último elemento del array, que es la longitud del array -1, en cuyo caso me lleva al primer elemento con índice [0]
  async goToNext() {
    this.ids = await this.createIdsArray();
    let currentId = parseInt(this.route.snapshot.params["id"]);
    let currentIndex = this.ids.findIndex((id) => {
      return id === currentId;
    });
    if (currentIndex === this.ids.length - 1) {
      this.router.navigate(["/contact/", this.ids[0]]);
    } else {
      this.router.navigate(["/contact/", this.ids[currentIndex + 1]]);
    }
  }
}
