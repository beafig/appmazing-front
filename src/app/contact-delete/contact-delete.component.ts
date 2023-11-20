import { Component, OnInit, Inject } from "@angular/core";
import { ContactsService } from "../contacts.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-contact-delete",
  templateUrl: "./contact-delete.component.html",
  styleUrls: ["./contact-delete.component.css"],
})
export class ContactDeleteComponent implements OnInit {
  contactId: number;
  contactName: string;

  constructor(
    private contactsService: ContactsService,
    public dialogRef: MatDialogRef<ContactDeleteComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { contactId: number; contactName: string },
    private router: Router
  ) {
    (this.contactId = data.contactId), (this.contactName = data.contactName);
  }
  ngOnInit() {}

  async confirm(): Promise<void> {
    await this.contactsService.deleteContact(this.contactId);
    this.dialogRef.close();
    // borra la ruta que estuviera cargada ya que hemos eliminado el contacto y no podemos volver a esa ruta
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate(["/contacts"]);
  }
}
