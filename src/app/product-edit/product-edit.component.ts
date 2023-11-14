import { Component, OnInit } from "@angular/core";
import { Category } from "model/Category";
import { Product } from "model/Product";
import { ProductsService } from "../products.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoriesService } from "../categories.service";

@Component({
  selector: "app-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.css"],
})
export class ProductEditComponent implements OnInit {
  product: Product;
  categories: Category[] = [];
  category: Category = new Category();
  constructor(
    private productService: ProductsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService
      .getProduct(this.route.snapshot.params["id"])
      .subscribe((data) => {
        this.product = data;
      });
    this.categoriesService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  async updateProduct() {
    this.verifyStock();
    this.verifyDate();
    this.productService.updateProduct(this.product);
    await this.navigateToProductDetail();
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