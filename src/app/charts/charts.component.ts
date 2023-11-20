import { Component, OnInit } from "@angular/core";
import { ContactsService } from "../contacts.service";
import { ProductsService } from "../products.service";
import { Product } from "../model/Product";

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.css"],
})
export class ChartsComponent implements OnInit {
  initialLetter: [];
  contactsByFullName: any[];
  emailExtensions: [];
  phonePrefixData: [];
  categoriesData: [];
  productsAvailability: [];
  productsPriceAndStock: [];

  constructor(
    private contactsService: ContactsService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.contactsService.getContacts().subscribe((data) => {
      this.initialLetter = this.calculateInitialLettersData(data);
      this.contactsByFullName = this.calculateContactsByFullNameData(data);
      this.emailExtensions = this.calculateEmailExtensionsData(data);
      this.phonePrefixData = this.generatePhonePrefixData(data);
    });
    this.productsService.getProducts().subscribe((data) => {
      this.categoriesData = this.calculateCategoriesData(data);
      this.productsAvailability = this.calculateProductAvailability(data);
      this.productsPriceAndStock = this.calculateProductPriceAndStock(data);
    });
  }

  calculateInitialLettersData(contacts: any[]): any {
    return contacts.reduce((result, contact) => {
      const initial = contact.first_surname.charAt(0).toUpperCase();
      if (result.find((item) => item.name === initial)) {
        result.find((item) => item.name === initial).value++;
      } else {
        result.push({ name: initial, value: 1 });
      }
      return result;
    }, []);
  }

  calculateContactsByFullNameData(contacts: any[]): any[] {
    let tempContactsByFullName = [
      {
        name: "Contacts",
        series: [],
      },
    ];
    contacts.forEach((contact) => {
      let fullName = contact.name + contact.first_surname;
      // agrego comprobación porque el segundo apellido no es obligatorio
      if (contact.second_surname != undefined) {
        fullName = fullName + contact.second_surname;
      }
      const size = fullName.length;
      const range = `${size - (size % 5)} - ${size - (size % 5) + 4} car.`;
      let existingRange = tempContactsByFullName[0].series.find(
        (item) => item.name === range
      );
      if (existingRange) {
        existingRange.value++;
      } else {
        tempContactsByFullName[0].series.push({ name: range, value: 1 });
      }
    });
    return tempContactsByFullName.map((entry) => {
      return {
        ...entry,
        series: entry.series.sort(
          (a, b) => Number(a.name.split("-")[0]) - Number(b.name.split("-")[0])
        ),
      };
    });
  }

  calculateEmailExtensionsData(contacts: any[]): any {
    let emailExtensionsMap = new Map<string, number>();
    contacts.forEach((contact) => {
      let emailParts = contact.email.split("@");
      if (emailParts.length == 2) {
        const domain = emailParts[1];
        const firstDotIndex = domain.indexOf(".");
        if (firstDotIndex != -1) {
          const extension = domain.substring(firstDotIndex);
          if (emailExtensionsMap.has(extension)) {
            emailExtensionsMap.set(
              extension,
              emailExtensionsMap.get(extension) + 1
            );
          } else {
            emailExtensionsMap.set(extension, 1);
          }
        }
      }
    });

    let emailExtensions = [];
    emailExtensionsMap.forEach((value, key) => {
      emailExtensions.push({ name: key, value: value });
    });
    return emailExtensions;
  }
  generatePhonePrefixData(contacts: any[]): any {
    let phonePrefixData = [];
    let prefixCounts = {};
    contacts.forEach((contact) => {
      const phonePrefix = contact.phone_number.substring(0, 1);
      if (prefixCounts[phonePrefix]) {
        prefixCounts[phonePrefix]++;
      } else {
        prefixCounts[phonePrefix] = 1;
      }
    });
    for (let prefix in prefixCounts) {
      if (prefixCounts.hasOwnProperty(prefix)) {
        phonePrefixData.push({ name: prefix, value: prefixCounts[prefix] });
      }
    }
    return phonePrefixData;
  }

  // métodos para las gráficas de productos
  calculateCategoriesData(products: Product[]): any {
    return products.reduce((result, product) => {
      const category = product.fk_category.name;
      if (result.find((item) => item.name === category)) {
        result.find((item) => item.name === category).value++;
      } else {
        result.push({ name: category, value: 1 });
      }
      return result;
    }, []);
  }

  calculateProductAvailability(products: Product[]): any {
    const availableProducts = products.filter(
      (product) => product.active === true
    );
    const unavailableProducts = products.filter(
      (product) => product.active === false
    );
    const availableProductsCount = availableProducts.length;
    const unavailableProductsCount = unavailableProducts.length;
    return [
      { name: "Disponibles", value: availableProductsCount },
      { name: "No Disponibles", value: unavailableProductsCount },
    ];
  }
  calculateProductPriceAndStock(products: Product[]): any {
    return products.map((product) => {
      const newDate = new Date(product.date_added);
      const year = newDate.getFullYear();
      return {
        name: product.name,
        series: [
          { name: "Stock", value: product.stock },
          { name: "Año", value: year },
        ],
      };
    });
  }
}
