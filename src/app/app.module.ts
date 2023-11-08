import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ContactHomeComponent } from './contact-home/contact-home.component';
import { ProductHomeComponent } from './product-home/product-home.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  // los componentes se declaran automáticamente al crearlos
  declarations: [
    AppComponent,
    ContactHomeComponent,
    ProductHomeComponent,
    ContactDetailComponent,
    ProductDetailComponent
  ],
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
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
