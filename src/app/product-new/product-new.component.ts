import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ProductsService } from "../products.service";
import { CategoriesService } from "../categories.service";
import { Product } from "model/Product";
import { Category } from "model/Category";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-product-new",
  templateUrl: "./product-new.component.html",
  styleUrls: ["./product-new.component.css"],
})
export class ProductNewComponent implements OnInit {
  @ViewChild("form", { static: true }) form: NgForm;

  // product va a ser de tipo Product, y viene del modelo Product.ts. estos objetos deben estár inicializados
  product: Product = new Product();

  // debo tener el objeto category ya que es donde se cargará el dato del id de la categoría para pasárselo a product
  category: Category = new Category();
  // array de tipo Category donde voy a guardar los datos de la BD con el método getCategories()
  categories: Category[] = [];

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  verifyStock() {
    if (this.product.stock > 0) {
      this.product.active = true;
    } else {
      this.product.active = false;
    }
  }

  verifyDate() {
    if (this.product.date_added == null) {
      this.product.date_added = new Date();
    }
  }

  async newProduct() {
    this.verifyStock();
    this.verifyDate();
    const product = {
      name: this.product.name,
      stock: this.product.stock,
      price: this.product.price,
      active: this.product.active,
      date_added: this.product.date_added,
      fk_category: this.category,
    };
    if (
      this.form.controls["name"].hasError("required") ||
      this.form.controls["stock"].hasError("required") ||
      this.form.controls["price"].hasError("required") ||
      this.form.controls["fk_category"].hasError("required")
    ) {
      alert(
        "Revisa el formulario para asegurarte de que todos los campos son válidos."
      );
    } else {
      try {
        await this.productsService.newProduct(product);
        this.navigateToHome();
      } catch (error) {
        alert(
          "Se ha producido un error al crear el nuevo producto. Inténtelo de nuevo"
        );
      }
    }
  }

  cancelInsert() {
    this.navigateToHome();
  }

  navigateToHome() {
    this.router.navigate(["/products"]);
  }
}
