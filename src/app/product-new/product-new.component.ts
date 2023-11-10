import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { CategoriesService } from '../categories.service';
import { Product } from 'model/Product';
import { Category } from 'model/Category';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {
  // product va a ser de tipo Product, y viene del modelo Product.ts
product: Product = new Product();
category: Category = new Category();
// array de tipo Category donde voy a guardar los datos de la BD con el método getCategories()
categories: Category[] = []


  constructor(private router: Router, private productsService: ProductsService, private categoriesService: CategoriesService) {  }

  ngOnInit(): void{
    this.categoriesService.getCategories().subscribe(data =>{
    this.categories = data;
    })
  }

  async newProduct(){
      if (this.product.stock > 0){
        this.product.active = true;
      } else {
        this.product.active = false;
      }
      if(this.product.date_added == null){
        this.product.date_added = new Date()
      }
      const product={
      name: this.product.name, 
      stock: this.product.stock,
      price: this.product.price,
      active: this.product.active,
      date_added : this.product.date_added,
      fk_category: this.category
    }
    this.productsService.newProduct(product);
    await this.navigateToHome();
}

cancelInsert(){
  this.navigateToHome();
}

navigateToHome(){
  this.router.navigate(['/products'])
}
}