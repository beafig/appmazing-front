import { Component, OnInit } from "@angular/core";
import { ContactsService } from "../contacts.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-contact-edit",
  templateUrl: "./contact-edit.component.html",
  styleUrls: ["./contact-edit.component.css"],
})
export class ContactEditComponent implements OnInit {
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

  async updateContact() {
    this.contactService.updateContact(this.contact);
    await this.navigateToContactDetail();
  }

  cancelUpdate() {
    this.navigateToContactDetail();
  }

  navigateToContactDetail() {
    this.router.navigate(["/contact", this.route.snapshot.params["id"]]);
  }
}
