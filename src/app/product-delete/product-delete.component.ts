import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ProductsService } from "../products.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-delete",
  templateUrl: "./product-delete.component.html",
  styleUrls: ["./product-delete.component.css"],
})
export class ProductDeleteComponent implements OnInit {
  productId: number;
  productName: string;

  constructor(
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<ProductDeleteComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { productId: number; productName: string },
    private router: Router
  ) {
    (this.productId = data.productId), (this.productName = data.productName);
  }

  ngOnInit() {}

  async confirm(): Promise<void> {
    await this.productsService.deleteProduct(this.productId);
    this.dialogRef.close();
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate(["/products"]);
  }
}
