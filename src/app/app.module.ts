import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { ContactHomeComponent } from "./contact-home/contact-home.component";
import { ProductHomeComponent } from "./product-home/product-home.component";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MAT_DATE_LOCALE,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
} from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { ContactDetailComponent } from "./contact-detail/contact-detail.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ContactNewComponent } from "./contact-new/contact-new.component";
import { FormsModule } from "@angular/forms";
import { ProductNewComponent } from "./product-new/product-new.component";
import { ContactEditComponent } from "./contact-edit/contact-edit.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { ChartsComponent } from "./charts/charts.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { DatePipe } from "@angular/common";
import { ContactDeleteComponent } from "./contact-delete/contact-delete.component";
import { ProductDeleteComponent } from "./product-delete/product-delete.component";

@NgModule({
  // los componentes se declaran automáticamente al crearlos
  declarations: [
    AppComponent,
    ContactHomeComponent,
    ProductHomeComponent,
    ContactDetailComponent,
    ProductDetailComponent,
    ContactNewComponent,
    ProductNewComponent,
    ContactEditComponent,
    ProductEditComponent,
    ChartsComponent,
    ContactDeleteComponent,
    ProductDeleteComponent,
  ],
  entryComponents: [ContactDeleteComponent, ProductDeleteComponent],
  // importamos los módulos que vamos a usar, los 3 primeros se declaran al crear el proyecto, los demas los vamos añadiendo cuando los necesitamos
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // modulo de la librería material para table, antes hemos añadido la librería material (ng add @angular/material)
    MatTableModule,
    // módulo para la peticiones al servidor (no es necesario añadir nada antes solo se declara el módulo y se importa)
    HttpClientModule,
    // módulos de la librería material para añadir un barra nav y botones
    MatToolbarModule,
    MatButtonModule,
    // módulos de la librería material para crear tarjetas y añadir iconos
    MatCardModule,
    MatIconModule,
    // módulos para el formulario
    FormsModule,
    MatInputModule,
    MatSelectModule,
    // modulo para abrir ventana modal
    MatDialogModule,
    // librería para las gráficas
    NgxChartsModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "es-ES" }, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
