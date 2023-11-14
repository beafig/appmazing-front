import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../products.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit {
  product: any;

  products: any = [];
  ids = [];
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productsService
        .getProduct(this.route.snapshot.params["id"])
        .subscribe((data) => {
          this.product = data;
        });
    });
  }
  navigateToHome() {
    this.router.navigate(["/products"]);
  }

  updateProduct() {
    this.router.navigate(["product/edit", this.route.snapshot.params["id"]]);
  }

  async createIdsArray(): Promise<number[]> {
    return new Promise((resolve) => {
      this.productsService.getProducts().subscribe((data) => {
        this.products = data;
        this.ids = this.products.map((e) => e.id);
        resolve(this.ids);
      });
    });
  }

  async goToPrevious() {
    this.ids = await this.createIdsArray();
    let currentId = parseInt(this.route.snapshot.params["id"]);
    let currentIndex = this.ids.findIndex((id) => {
      return id === currentId;
    });
    if (currentIndex === 0) {
      currentIndex = this.ids.length - 1;
      this.router.navigate(["/product/", this.ids[currentIndex]]);
    } else {
      this.router.navigate(["/product/", this.ids[currentIndex - 1]]);
    }
  }

  async goToNext() {
    this.ids = await this.createIdsArray();
    let currentId = parseInt(this.route.snapshot.params["id"]);
    let currentIndex = this.ids.findIndex((id) => {
      return id === currentId;
    });
    if (currentIndex === this.ids.length - 1) {
      this.router.navigate(["/product/", this.ids[0]]);
    } else {
      this.router.navigate(["/product/", this.ids[currentIndex + 1]]);
    }
  }
}
