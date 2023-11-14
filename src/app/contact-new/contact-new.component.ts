import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ContactsService } from "../contacts.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-contact-new",
  templateUrl: "./contact-new.component.html",
  styleUrls: ["./contact-new.component.css"],
})
export class ContactNewComponent implements OnInit {
  // para que las validaciones del form funcionen correctamente
  @ViewChild("form", { static: true }) form: NgForm;
  // los campos que tendrá el objeto Contact que enviaremos al servidor.
  name: string;
  first_surname: string;
  second_surname: string;
  phone_number: number;
  email: string;

  constructor(
    private router: Router,
    private contactsService: ContactsService
  ) {}

  ngOnInit() {}

  // handler del botón de submit, creamos el contacto recogiendo todos los valores del form, y llamamos al método para volver a la tabla
  async newContact() {
    const contact = {
      name: this.name,
      first_surname: this.first_surname,
      second_surname: this.second_surname,
      phone_number: this.phone_number,
      email: this.email,
    };
    // validaciones y mensaje de error del form
    if (
      this.form.controls["name"].hasError("required") ||
      this.form.controls["first_surname"].hasError("required") ||
      this.form.controls["phone_number"].hasError("required") ||
      this.form.controls["email"].hasError("required") ||
      this.form.controls["email"].hasError("pattern")
    ) {
      alert(
        "Revisa el formulario para asegurarte de que todos los campos son válidos."
      );
    } else {
      this.contactsService.newContact(contact);
      await this.navigateToHome();
    }
  }

  // handler del botón cancelar
  cancelInsert() {
    this.navigateToHome();
  }

  //método para volver a la tabla de contactos, tanto cuando crees un nuevo contacto como cuando le des al botón de cancelar, llamaremos a este método en la handler del los botones
  navigateToHome() {
    this.router.navigate(["/contacts"]);
  }
}
