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
  //@ViewChild: Es un decorador en Angular que se utiliza para obtener acceso a un elemento del componente hijo desde el componente padre. En este caso, se está utilizando para obtener acceso a un elemento con la referencia local "form".
  //{ static: true }: Es una opción que se utiliza para especificar si se quiere que la búsqueda del elemento se realice de forma estática o dinámica. Cuando { static: true } se establece en true, significa que la búsqueda del elemento se realiza de manera estática, es decir, durante la fase de inicialización del componente
  // para que las validaciones del form funcionen correctamente
  @ViewChild("form", { static: true }) form: NgForm;
  // los campos que tendrá el objeto Contact que enviaremos al servidor, se pueden crear aquí o usar un modelo como en el caso de product
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

  // handler del botón de submit, creamos el contacto recogiendo todos los valores del form, y llamamos al método para volver a la tabla. Es async ya que quiero esperar a que se cree el contacto antes de volver a la tabla.
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
        "Revisa el formulario y comprueba que todos los datos son válidos. Todos los campos son obligatorios excepto el segundo apellido."
      );
    } else {
      try {
        await this.contactsService.newContact(contact);
        this.navigateToHome();
      } catch (e) {
        alert("Error al agregar contacto, inténtelo de nuevo");
        console.log(e);
      }
    }
  }

  // handler del botón cancelar
  cancelInsert() {
    this.navigateToHome();
  }

  //método para volver a la tabla de contactos
  navigateToHome() {
    this.router.navigate(["/contacts"]);
  }
}
