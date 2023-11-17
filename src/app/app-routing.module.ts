import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ContactHomeComponent } from "./contact-home/contact-home.component";
import { ProductHomeComponent } from "./product-home/product-home.component";
import { ContactDetailComponent } from "./contact-detail/contact-detail.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ContactNewComponent } from "./contact-new/contact-new.component";
import { ProductNewComponent } from "./product-new/product-new.component";
import { ContactEditComponent } from "./contact-edit/contact-edit.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { ChartsComponent } from "./charts/charts.component";

// definimos las rutas del proyecto y a que componenente nos lleva
//   { path: "contact/new", component: ContactNewComponent }, { path: "contact/:id", component: ContactDetailComponent }, -> se deben definir en este orden ya que tienen el mismo comiendo de URL, y si ponemos primero la de :id provoca errores ya que identifica /new como si fuera el parámetro id
const routes: Routes = [
  { path: "", component: ChartsComponent },
  { path: "contacts", component: ContactHomeComponent },
  { path: "contact/new", component: ContactNewComponent },
  { path: "contact/:id", component: ContactDetailComponent },
  { path: "contact/edit/:id", component: ContactEditComponent },
  { path: "products", component: ProductHomeComponent },
  { path: "product/new", component: ProductNewComponent },
  { path: "product/:id", component: ProductDetailComponent },
  { path: "product/edit/:id", component: ProductEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
