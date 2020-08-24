import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ContactModel } from './contacts.types';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  create(contact: ContactModel) {
    return this.http.put<any>(`${environment.api}/contacts/${contact._id}`, {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phoneNumber: contact.phoneNumber
    });
  }

  update(contact: ContactModel) {
    return this.http.put<any>(`${environment.api}/contacts/${contact._id}`, {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phoneNumber: contact.phoneNumber
    });
  }

  delete(id: string) {
    return this.http.delete<any>(`${environment.api}/contacts/${id}`);
  }

  get(id: string) {
    return this.http.get<any>(`${environment.api}/contacts/${id}`);
  }

  list() {
    return this.http.get<any>(`${environment.api}/contacts`);
  }
}
