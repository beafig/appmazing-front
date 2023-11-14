import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../products.service";
import { Router } from "@angular/router";
import { Product } from "model/Product";

@Component({
  selector: "app-product-home",
  templateUrl: "./product-home.component.html",
  styleUrls: ["./product-home.component.css"],
})
export class ProductHomeComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  openDetailForm(row: any) {
    this.router.navigate(["/product", row.id]);
  }
  editProductDetail(product: Product) {
    this.router.navigate(["/product/edit", product]);
  }

  sortByPriceAsc() {
    this.products = [...this.products];
    this.products.sort((a, b) => {
      return a.price - b.price;
    });
  }
  sortByPriceDesc() {
    this.products = [...this.products];
    this.products.sort((a, b) => {
      return b.price - a.price;
    });
  }

  sortByCategoryAsc() {
    this.products = [...this.products];
    this.products.sort((a, b) => {
      return a.fk_category.name.localeCompare(b.fk_category.name);
    });
  }

  sortByCategoryDesc() {
    this.products = [...this.products];
    this.products.sort((a, b) => {
      return b.fk_category.name.localeCompare(a.fk_category.name);
    });
  }
  displayedColumns: string[] = [
    "id",
    "name",
    "stock",
    "price",
    "active",
    "date_added",
    "fk_category",
    "actions",
  ];
}
