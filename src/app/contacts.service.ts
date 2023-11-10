import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// servicio para conectar con el servidor
@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  // lo de los parántesis es el atributo del constructor
  constructor( private http: HttpClient) { }

  // método para devolver todos los contactos, es de tipo get
  // <any> para indicar que puede devolver cualquier tipo de dato
  getContacts(): Observable<any> {
    // url definida en el controlador del servidor
    const url = 'http://localhost:30030/contacts/getAll';
    // siempre hay que poner headers aunque vaya vacío como en este caso
    const headers = new HttpHeaders();
    return this.http.get<any>(url, {headers})
  }

  // método para devolver 1 de los contactos, es de tipo post, debe recibir el id del contacto que lo recibirá por parámetros
  getContact(contact_id: number): Observable<any>{
    const url= 'http://localhost:30030/contacts/get';
    //('Content-Type', 'application/json') -> esto se puede ver en los headers del método en Postman
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // en el body convertimos el id en una cadena de texto JSON, ({id: contact-id}) -> id es la clave que es como lo llamaremos en el componente y contact_id es el nombre del parámetro que le pasamos a este método
    const body= JSON.stringify({id: contact_id})
    return this.http.post<any>(url, body, {headers})
  }

  // método para añadir un nuevo contacto, le pasamos un contacto (creado en el form). es void porque no devuelve nada
  // el body no hay que transforlo a JSON porque lo haces directamente al cubrir el form cuando creas el objetos contact con name: this.name
  // el subscribe se hace aquí en vez de en el ts porque el método no devuelva nada, por lo que no recibiremos nada como data
  newContact(contact: any): void{
    const url= 'http://localhost:30030/contacts/add';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body= contact;
    this.http.post(url, body, {headers}).subscribe();
  }
}
