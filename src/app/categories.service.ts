import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  // método para obtener los nombres de las categorías
  getCategories(): Observable<any> {
    const url = "http://localhost:30030/categories/getAll";
    const headers = new HttpHeaders();
    return this.http.get<any>(url, { headers });
  }
}
