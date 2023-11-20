import { Component, OnInit, ViewChild } from "@angular/core";
import { Category } from "model/Category";
import { Product } from "model/Product";
import { ProductsService } from "../products.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoriesService } from "../categories.service";
import { NgForm } from "@angular/forms";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.css"],
})
export class ProductEditComponent implements OnInit {
  @ViewChild("form", { static: false }) form: NgForm;

  product: Product;
  categories: Category[] = [];

  constructor(
    private productService: ProductsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router,
    private datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.productService
      .getProduct(this.route.snapshot.params["id"])
      .subscribe((data) => {
        this.product = data;
        const formatDate = this.datepipe.transform(
          this.product.date_added,
          "yyyy-MM-dd"
        );
        //funciona pero me sale este error
        this.product.date_added = formatDate;
      });
    this.categoriesService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  async updateProduct() {
    this.verifyStock();
    this.verifyDate();
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
        await this.productService.updateProduct(this.product);
        this.navigateToProductDetail();
      } catch (e) {
        alert("Error al editar el producto, inténtelo de nuevo");
        console.log(e);
      }
    }
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
  cancelUpdate() {
    this.navigateToProductDetail();
  }

  navigateToProductDetail() {
    this.router.navigate(["/product", this.route.snapshot.params["id"]]);
  }
}
