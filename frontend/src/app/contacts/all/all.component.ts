import { Component, OnInit } from '@angular/core';

import { ContactModel } from '../contacts.types';
import { ContactsService } from '../contacts.service';
import { ModifyContactComponent } from '../modify-contact/modify-contact.component';
import { from } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Operation } from '../modify-contact/modify-contact.types';
@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  
  contacts: ContactModel[];

  constructor(private readonly service: ContactsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.service.list().subscribe((data) => {
      this.contacts = data;
    });
  }

  createContact() {
    const modal = this.modalService.open(ModifyContactComponent);
    modal.componentInstance.operation = Operation.Create;
    modal.componentInstance.passEntry.subscribe((newContact) => {
      console.log(newContact);
      this.contacts = [
        ...this.contacts,
        newContact
      ];
    });
    // .result.then((result) => {
    //   //this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }

  editContact(contact: ContactModel, index: number) {
    const modal = this.modalService.open(ModifyContactComponent);
    modal.componentInstance.contactData = contact;
    modal.componentInstance.operation = Operation.Update;
    modal.componentInstance.passEntry.subscribe((updatedContact) => {
      this.contacts[index] = updatedContact;
    });
    // .result.then((result) => {
    //   //this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }

  remove(contact: ContactModel, index: number) {
    this.service.delete(contact._id).subscribe(() => {
      this.contacts.splice(index, 1)
    })
  }

}
