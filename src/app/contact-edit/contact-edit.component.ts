import { Component, OnInit, ViewChild } from "@angular/core";
import { ContactsService } from "../contacts.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-contact-edit",
  templateUrl: "./contact-edit.component.html",
  styleUrls: [
    //ya que los 2 componentes tienen los mismo estilos pensé en compartir la misma hoja de estilos pero no es una buena práctica
    // "../contact-new/contact-new.component.css",
    "./contact-edit.component.css",
  ],
})
export class ContactEditComponent implements OnInit {
  // El parámetro static en @ViewChild determina cuándo se debe buscar el elemento referenciado (#form ).Cuando static es true, Angular intenta encontrar el elemento referenciado (#form) durante la fase de compilación.Cuando static es false, Angular espera hasta la fase de ejecución (runtime) para buscar el elemento referenciado.
  @ViewChild("form", { static: false }) form: NgForm;

  contact: any;

  constructor(
    private contactService: ContactsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.contactService
      .getContact(this.route.snapshot.params["id"])
      .subscribe((data) => {
        this.contact = data;
      });
  }

  async updateContact(): Promise<void> {
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
      try {
        await this.contactService.updateContact(this.contact);
        this.navigateToContactDetail();
      } catch (e) {
        alert("Error al editar el contacto, inténtelo de nuevo");
        console.log(e);
      }
    }
  }

  cancelUpdate() {
    this.navigateToContactDetail();
  }

  navigateToContactDetail() {
    this.router.navigate(["/contact", this.route.snapshot.params["id"]]);
  }
}
